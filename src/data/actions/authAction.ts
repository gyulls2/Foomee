// 서버 액션 정의
'use server';

import { signIn, update, auth } from '@/auth';
import { redirect } from 'next/navigation';

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

    if (result?.error) {
      console.error('로그인 실패:', result.error);
      throw new Error(result.error);
    }
  } catch (err) {
    console.error(err);
  }
  redirect('/home');
}

// export async function signInWithGoogle(formData: FormData) {
//   await signIn('google', { redirectTo: '/' });
// }

// export async function signInWithGithub(formData: FormData) {
//   await signIn('github', { redirectTo: '/' });
// }

export { auth as getSession, update as updateSession };
