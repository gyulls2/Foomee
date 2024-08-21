// 서버 액션 정의
'use server';

import { signIn, update, auth } from '@/auth';
import { AuthError } from 'next-auth';

type LoginForm = {
  email: string;
  password: string;
  experience?: 'auto-login' | 'trial';
};

// email/password 로그인
export async function signInWithCredentials(formData: LoginForm) {
  try {
    const { email, password } = formData;
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    console.log('result:', result);

    if (result?.error) {
      console.error('로그인 실패:', result.error);
      throw new Error(result.error);
    }
    console.log('로그인 성공, 리다이렉트 시작');
    return true;
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    if (error instanceof AuthError) {
      throw new Error(error.message);
    } else {
      throw new Error('로그인 중 문제가 발생했습니다. 다시 시도해 주세요.');
    }
  }
  // redirect('/home');
}

// export async function signInWithGoogle(formData: FormData) {
//   await signIn('google', { redirectTo: '/' });
// }

// export async function signInWithGithub(formData: FormData) {
//   await signIn('github', { redirectTo: '/' });
// }

export { auth as getSession, update as updateSession };
