import NextAuth, { AuthError } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

class customError extends AuthError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  providers: [
    CredentialsProvider({
      // email/password 로그인
      async authorize(credentials) {
        try {
          const res = await fetch(`${SERVER}/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'client-id': '04-Foomee',
            },
            body: JSON.stringify(credentials),
          });

          const data = await res.json();

          if (!res.ok) {
            console.error(`서버 오류: ${res.status} ${res.statusText}`);
            throw new Error(data.message || 'Authentication failed');
          }

          if (data.ok) {
            const user = data.item;
            return {
              _id: user._id,
              name: user.name,
              email: user.email,
              type: user.type,
              profileImage:
                user.profileImage && `${SERVER}${user.profileImage}`,

              accessToken: user.token.accessToken,
              refreshToken: user.token.refreshToken,
            };
          } else {
            console.error(`인증 실패: ${data.message}`);
            throw new Error(data.message || 'Authentication failed');
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new customError(
              error.message ||
                '로그인 중 문제가 발생했습니다. 다시 시도해 주세요.',
            );
          } else {
            throw new customError('알 수 없는 오류가 발생했습니다.');
          }
        }
      },
    }),
  ],
  // debug: true,
  session: {
    strategy: 'jwt', // default 'jwt'
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: '/login', // default '/auth/signin'
  },
  callbacks: {
    // // 로그인 처리를 계속 할지 여부 결정
    // // true를 리턴하면 로그인 처리를 계속하고 false를 리턴하거나 Error를 throw하면 로그인 흐름을 중단
    // // user: authorize()가 리턴한 값
    // async signIn({ user }) {
    //   // user에 들어 있는 사용자 정보를 이용해서 최초에 한번은 회원 DB에 저장(회원가입)
    //   // 가입된 회원일 경우 자동으로 로그인 처리
    //   console.log('signIn.user', user);
    //   return true;
    // },
    // 로그인 성공한 회원 정보로 token 객체 설정
    // 최초 로그인시 user 객체 전달,
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.type = user.type;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token as JWT;
    },
    // 클라이언트에서 세션 정보 요청시 호출
    // token 객체 정보로 session 객체 설정
    async session({ session, token }) {
      session.user._id = token._id as number;
      session.user.type = token.type as string;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
});
