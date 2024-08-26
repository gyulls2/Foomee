'use server';

import { signIn } from '@/auth';
import {
  ApiRes,
  ApiResWithValidation,
  CoreErrorRes,
  OAuthUser,
  SingleItem,
  UserData,
  UserForm,
  UserLoginForm,
} from '@/types';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

// auth provider 인증 후 자동 회원 가입
export async function signupWithOAuth(
  user: OAuthUser,
): Promise<ApiResWithValidation<SingleItem<UserData>, UserForm>> {
  const res = await fetch(`${SERVER}/users/signup/oauth`, {
    method: 'POST',
    headers: {
      'client-id': `${CLIENT_ID}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  return res.json();
}

// Auth.js 기반 아이디/패스워드 인증 로직
export async function signInWithCredentials(loginData: UserLoginForm) {
  try {
    const result = await signIn('credentials', {
      ...loginData,
      redirect: false,
    });
    console.log('signInWithCredentials 로그인한 결과', result);
    return result;
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return err.cause as CoreErrorRes;
    }
  }
}

// 아이디/패스워드 로그인
export async function login(
  userObj: UserLoginForm,
): Promise<ApiResWithValidation<SingleItem<UserData>, UserLoginForm>> {
  const res = await fetch(`${SERVER}/users/login`, {
    method: 'POST',
    headers: {
      'client-id': `${CLIENT_ID}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userObj),
  });
  return res.json();
}

// auth provider로 인증된 사용자 로그인
export async function loginOAuth(
  providerAccountId: string,
): Promise<ApiRes<SingleItem<UserData>>> {
  const res = await fetch(`${SERVER}/users/login/with`, {
    method: 'POST',
    headers: {
      'client-id': `${CLIENT_ID}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ providerAccountId }),
  });
  return res.json();
}

// DB 카카오 로그인
export async function loginWithKakao(
  code: string, // 카카오 인증 코드
  redirectUri: string, // 카카오 인가 코드 받기 API에 사용한 redirect_uri 값
  user: Partial<UserData> = {}, // 추가적인 사용자 정보
): Promise<ApiRes<SingleItem<UserData>> | undefined> {
  const res = await fetch(`${SERVER}/users/login/kakao`, {
    method: 'POST',
    headers: {
      'client-id': `${CLIENT_ID}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      code,
      redirect_uri: redirectUri,
      user,
    }),
  });
  return res.json();
}

// 구글 로그인
export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/home' });
}

// 네이버 로그인
export async function signInWithNaver() {
  await signIn('naver', { redirectTo: '/home' });
}

// 카카오 로그인
export async function signInWithKakao() {
  await signIn('kakao', { redirectTo: '/home' });
}

// github 로그인
export async function signInWithGithub() {
  await signIn('github', { redirectTo: '/home' });
}
