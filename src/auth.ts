import NextAuth, { CredentialsSignin } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import github from 'next-auth/providers/github';
import google from 'next-auth/providers/google';
import { OAuthUser, RefreshTokenRes, UserData, UserLoginForm } from './types';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { login, loginOAuth, signupWithOAuth } from './data/actions/authAction';
import { fetchAccessToken, fetchUser } from './data/fetch/userFetch';

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  trustHost: true, // 배포시 필요
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      // email/password 정보로 로그인 요청
      async authorize(credentials) {
        // credentials: 서버 액션에서 호출한 signIn('credentials', 사용자 정보) 메소드의 두번째 인수(사용자 정보)
        const resJson = await login(credentials as UserLoginForm);

        if (resJson.ok) {
          const user = resJson.item;
          return {
            id: String(user._id),
            email: user.email,
            name: user.name,
            type: user.type,
            accessToken: user.token!.accessToken,
            refreshToken: user.token!.refreshToken,
          };
        } else {
          throw new CredentialsSignin(resJson.message, { cause: resJson });
        }
      },
    }),
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt', // JSON Web Token 사용(기본값)
    maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
    // maxAge: 60,
  },
  pages: {
    // import { signIn } from "next-auth/react";
    // signIn() 호출시 이동할 페이지 지정
    // 기본값은 내장된 로그인 페이지인 '/auth/signin'
    signIn: '/login',
  },
  callbacks: {
    // 로그인 처리를 계속 할지 여부 결정. 로그인한 후 추가 검증을 하거나 특정 조건에 따라서 로그인 성공/실패를 다시 결정할 때 사용
    // signIn 콜백은 true를 반환하면 로그인 처리를 계속하고,
    // false를 반환하거나 오류를 던지면 로그인 흐름을 중단하여 사용자에게 오류 페이지로 리디렉션
    // user: authorize()가 리턴한 객체
    // account: provider 정보
    // profile: OAuth 제공자가 반환한 사용자 프로필 정보
    // credentials: authorize()에 전달된 로그인 정보(사용자가 입력한 id, password 등)
    async signIn({ user, account, profile, credentials }) {
      /* id/pwd
        callbacks.signIn {
          id: '2',
          email: 's1@market.com',
          name: '네오',
          type: 'seller',
          image: 'http://localhost/files/00-next-level/user-neo.webp',
          accessToken: '...',
          refreshToken: '...'
        } {
          providerAccountId: '2',
          type: 'credentials',
          provider: 'credentials'
        } undefined undefined {
          email: 's1@market.com',
          password: '11111111',
          callbackUrl: '/movies'
        }
      */

      /* github
        callbacks.signIn {
          id: 'b0fcfc5b-2458-4087-b7cb-064647716ff0',
          name: 'Kilyong Jeong',
          email: 'uzoolove@gmail.com',
          image: 'https://avatars.githubusercontent.com/u/7599569?v=4'
        } {
          access_token: '...',
          token_type: 'bearer',
          scope: 'read:user,user:email',
          provider: 'github',
          type: 'oauth',
          providerAccountId: '7599569'
        } {
          login: 'uzoolove',
          id: 7599569,
          node_id: 'MDQ6VXNlcjc1OTk1Njk=',
          ...
        } undefined
      */
      console.log('callbacks.signIn', user, account, profile, credentials);
      switch (account?.provider) {
        case 'credentials':
          /*
            id/pwd 로그인 {
              id: '2',
              email: 's1@market.com',
              name: '네오',
              type: 'seller',
              image: 'https://api.fesp.shop/files/00-sample/user-neo.webp',
              accessToken: '...',
              refreshToken: '...'
            }
          */
          console.log('id/pwd 로그인', user);
          break;
        case 'google':
        case 'github':
          /*
            OAuth 로그인 {
              id: '409716c3-f6d3-4988-bf0e-062d85b3114e',
              name: 'dainhome',
              email: 'homedain01@gmail.com',
              image: 'https://lh3.googleusercontent.com/a/ACg8ocKqRBGG4QfyzlASvT7kARFlFHW7s8tQ6XQ-3fDQD6U7lLsqHQ=s96-c'   
            }
          */
          console.log('OAuth 로그인', user);

          // DB에서 id를 조회해서 있으면 로그인 처리를 없으면 자동 회원 가입 후 로그인 처리
          let userInfo: UserData | null = null;
          try {
            // 자동 회원 가입
            const newUser: OAuthUser = {
              type: 'user',
              loginType: account.provider,
              name: user.name || '',
              email: user.email || '',
              extra: { providerAccountId: account.providerAccountId },
            };

            // 이미 가입된 회원이면 회원가입이 되지 않고 에러를 응답하므로 무시하면 됨
            const result = await signupWithOAuth(newUser);
            console.log('회원 가입', result);

            // 자동 로그인
            const resData = await loginOAuth(account.providerAccountId);
            if (resData.ok) {
              userInfo = resData.item;
              console.log(userInfo);
            } else {
              // API 서버의 에러 메시지 처리
              throw new Error(resData.message);
            }
          } catch (err) {
            console.error(err);
            throw err;
          }

          user.id = String(userInfo._id);
          user.type = userInfo.type;
          user.accessToken = userInfo.token!.accessToken;
          user.refreshToken = userInfo.token!.refreshToken;
          user.isNewUser = userInfo.extra?.age ? false : true;

          break;
      }

      return true;
    },

    // JWT 토큰이 생성될 때, 업데이트될 때 호출
    // 로그인 성공한 회원 정보로 token 객체 설정
    // 최초 로그인시 user 객체 전달, 업데이트시나 세션 조회용으로 호출되면 user는 없음
    async jwt({ token, user, account, profile, session, trigger }) {
      /*
        callbacks.jwt {
          name: '네오',
          email: 's1@market.com',
          picture: 'http://localhost/files/00-next-level/user-neo.webp',
          sub: '2'
        } {
          id: '2',
          email: 's1@market.com',
          name: '네오',
          type: 'seller',
          image: 'http://localhost/files/00-next-level/user-neo.webp',
          accessToken: '...',
          refreshToken: '...'
        } {
          providerAccountId: '2',
          type: 'credentials',
          provider: 'credentials'
        } undefined undefined
      */

      /* 로그인 완료 후 메인 페이지로 이동
        signInWithCredentials 로그인한 결과 http://localhost:3000
        ○ Compiling / ...
        ✓ Compiled / in 1005ms (1122 modules)
        callbacks.redirect http://localhost:3000 http://localhost:3000
      */

      /* 메인 페이지로 이동 후 세션 가져옴
        callbacks.jwt {
          name: '네오',
          email: 's1@market.com',
          picture: 'http://localhost/files/00-next-level/user-neo.webp',
          sub: '2',
          id: '2',
          type: 'seller',
          accessToken: '...',
          refreshToken: '...',
          iat: 1723078694,
          exp: 1723165094,
          jti: '1535edee-7491-4bd5-9efe-7daf0e4a6698'
        } undefined undefined undefined undefined
      */
      // console.log('callbacks.jwt', token, user, account, profile, session);

      // 토큰 만료 체크, 리플래시 토큰으로 재발급
      // 리플레시 토큰도 만료되었으면 로그아웃 처리
      if (user) {
        token.id = user.id;
        token.type = user.type;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.isNewUser = user.isNewUser;
      }

      // JWT 자체의 만료 시간 추출
      const decodedToken = jwt.decode(token.accessToken) as JwtPayload | null;
      const accessTokenExpires = decodedToken?.exp
        ? decodedToken?.exp * 1000
        : 0; // 밀리초 단위로 변환

      // 토큰 만료 확인
      const shouldRefreshToken = Date.now() > accessTokenExpires;
      if (shouldRefreshToken) {
        try {
          console.log('토큰 만료됨.', Date.now() + ' > ' + accessTokenExpires);
          const res = await fetchAccessToken(token.refreshToken);
          if (res.ok) {
            const resJson: RefreshTokenRes = await res.json();
            return {
              ...token,
              accessToken: resJson.accessToken,
            };
          } else {
            if (res.status === 401) {
              // 인증 되지 않음(리플래시 토큰 인증 실패)
              console.log(
                '리플래시 토큰 인증 실패. 로그인 페이지로 이동해야 함',
                await res.json(),
              );
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(error);
            return {
              ...token,
              error: error.message,
            };
          }
        }
      } else {
        // console.log(`토큰 ${accessTokenExpires - Date.now()} ms 남음`);
      }

      // 세션 없데이트
      if (trigger === 'update' && session) {
        token.name = session.name;
      }

      return token;
    },

    // 클라이언트에서 세션 정보 요청시 호출
    // 세션에 저장할 사용자 정보를 지정(세션 정보 수정)
    // token 객체 정보로 session 객체 설정
    async session({ session, token }) {
      /*
        callbacks.session {
          user: {
            name: '네오',
            email: 's1@market.com',
            image: 'http://localhost/files/00-next-level/user-neo.webp'
          },
          expires: '2024-08-09T00:58:15.653Z'
        } {
          name: '네오',
          email: 's1@market.com',
          picture: 'http://localhost/files/00-next-level/user-neo.webp',
          sub: '2',
          id: '2',
          type: 'seller',
          accessToken: '...',
          refreshToken: '...',
          iat: 1723078694,
          exp: 1723165094,
          jti: '1535edee-7491-4bd5-9efe-7daf0e4a6698'
        }
      */
      // console.log('callbacks.session', session, token);
      session.user.id = token.id as string;
      session.user.type = token.type as string;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.isNewUser = token.isNewUser;
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   console.log('callbacks.redirect', url, baseUrl);
    //   // 토큰 정보를 가져와서 사용자의 extra 속성 확인
      
    //   if (!userData?.isNewUser) {
    //     return `${baseUrl}/home`; // 목표 설정이 된 회원은 홈으로 리디렉션
    //   } else {
    //     return `${baseUrl}/signup/step1`; // 회원가입이 안된 회원은 목표 설정 페이지로 리디렉션
    //   }
    },

    // 로그인/로그아웃 후 리디렉션할 URL 지정
    // redirect 함수를 제공할 경우 signIn 호출시 두번째 인자로 전달하는 옵션의 redirectTo는 동작하지 않음
    // signIn('google', { redirectTo: '/music' });
    // url: signIn 콜백 함수가 반환한 값
    // baseUrl: NEXTAUTH_URL 환경변수에 설정된 값
    // async redirect({ url, baseUrl }){
    //   console.log('callbacks.redirect', url, baseUrl);
    //   return baseUrl;
    // },
  },
});

// import NextAuth, { AuthError } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { JWT } from 'next-auth/jwt';
// import google from 'next-auth/providers/google';
// import { OAuthUser, UserData } from './types';
// import { loginOAuth, signupWithOAuth } from './data/actions/authAction';

// const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
// const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

// class customError extends AuthError {
//   constructor(message: string) {
//     super();
//     this.message = message;
//   }
// }

// export const {
//   handlers,
//   signIn,
//   signOut,
//   auth,
//   unstable_update: update,
// } = NextAuth({
//   trustHost: true,
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       // email/password 로그인
//       async authorize(credentials) {
//         try {
//           const res = await fetch(`${SERVER}/users/login`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'client-id': `${CLIENT_ID}`,
//             },
//             body: JSON.stringify(credentials),
//           });

//           const data = await res.json();

//           if (!res.ok) {
//             console.error(`서버 오류: ${res.status} ${res.statusText}`);
//             throw new Error(data.message || 'Authentication failed');
//           }

//           if (data.ok) {
//             const user = data.item;
//             return {
//               _id: user._id,
//               name: user.name,
//               email: user.email,
//               type: user.type,
//               profileImage:
//                 user.profileImage && `${SERVER}${user.profileImage}`,

//               accessToken: user.token.accessToken,
//               refreshToken: user.token.refreshToken,
//             };
//           } else {
//             console.error(`인증 실패: ${data.message}`);
//             throw new Error(data.message || 'Authentication failed');
//           }
//         } catch (error) {
//           if (error instanceof Error) {
//             throw new customError(
//               error.message ||
//                 '로그인 중 문제가 발생했습니다. 다시 시도해 주세요.',
//             );
//           } else {
//             throw new customError('알 수 없는 오류가 발생했습니다.');
//           }
//         }
//       },
//     }),
//     google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   // debug: true,
//   session: {
//     strategy: 'jwt', // default 'jwt'
//     maxAge: 60 * 60 * 24,
//   },
//   pages: {
//     signIn: '/login', // default '/auth/signin'
//   },
//   callbacks: {
//     // 로그인 처리를 계속 할지 여부 결정
//     // true를 리턴하면 로그인 처리를 계속하고 false를 리턴하거나 Error를 throw하면 로그인 흐름을 중단
//     // user: authorize()가 리턴한 값
//     async signIn({ user, account, profile, credentials }) {
//       // user에 들어 있는 사용자 정보를 이용해서 최초에 한번은 회원 DB에 저장(회원가입)
//       // 가입된 회원일 경우 자동으로 로그인 처리
//       console.log('callbacks.signIn', user, account, profile, credentials);
//       switch (account?.provider) {
//         case 'credentials':
//           console.log('id/pwd 로그인', user);
//           break;
//         case 'google':
//         case 'github':
//           /*
//             OAuth 로그인 {
//               id: '409716c3-f6d3-4988-bf0e-062d85b3114e',
//               name: 'dainhome',
//               email: 'homedain01@gmail.com',
//               image: 'https://lh3.googleusercontent.com/a/ACg8ocKqRBGG4QfyzlASvT7kARFlFHW7s8tQ6XQ-3fDQD6U7lLsqHQ=s96-c'
//             }
//           */
//           console.log('OAuth 로그인', user);

//           // DB에서 id를 조회해서 있으면 로그인 처리를 없으면 자동 회원 가입 후 로그인 처리
//           let userInfo: UserData | null = null;
//           try {
//             // 자동 회원 가입
//             const newUser: OAuthUser = {
//               type: 'user',
//               loginType: account.provider,
//               name: user.name || '',
//               email: user.email || '',
//               image: user.image || '',
//               extra: {
//                 ...profile,
//                 providerAccountId: account.providerAccountId,
//               },
//             };

//             // 이미 가입된 회원이면 회원가입이 되지 않고 에러를 응답하므로 무시하면 됨
//             const result = await signupWithOAuth(newUser);
//             console.log('회원 가입', result);

//             // 자동 로그인
//             const resData = await loginOAuth(account.providerAccountId);
//             if (resData.ok) {
//               userInfo = resData.item;
//               console.log(userInfo);
//             } else {
//               // API 서버의 에러 메시지 처리
//               throw new Error(resData.message);
//             }
//           } catch (err) {
//             console.error(err);
//             throw err;
//           }

//           user.id = String(userInfo._id);
//           user.type = userInfo.type;
//           user.accessToken = userInfo.token!.accessToken;
//           user.refreshToken = userInfo.token!.refreshToken;

//           break;
//       }

//       return true;
//     },
//     // 로그인 성공한 회원 정보로 token 객체 설정
//     // 최초 로그인시 user 객체 전달,
//     async jwt({ token, user }) {
//       if (user) {
//         token._id = user._id;
//         token.type = user.type;
//         token.accessToken = user.accessToken;
//         token.refreshToken = user.refreshToken;
//       }
//       return token as JWT;
//     },
//     // 클라이언트에서 세션 정보 요청시 호출
//     // token 객체 정보로 session 객체 설정
//     async session({ session, token }) {
//       session.user._id = token._id as number;
//       session.user.type = token.type as string;
//       session.accessToken = token.accessToken;
//       session.refreshToken = token.refreshToken;
//       return session;
//     },
//   },
// });
