'use client';

import InputError from '@/components/InputError';
import { signInWithCredentials } from '@/data/actions/authAction';
import { useForm } from 'react-hook-form';
import { signOut } from 'next-auth/react';
import useNutritionStore from '@/zustand/nutritionStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthError } from 'next-auth';

type LoginForm = {
  email: string;
  password: string;
  experience?: 'auto-login' | 'trial';
};

const EMAIL = process.env.NEXT_PUBLIC_TRIAL_EMAIL as string;
const PW = process.env.NEXT_PUBLIC_TRIAL_PW as string;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { isSubmitting, errors, isValid },
  } = useForm<LoginForm>({ mode: 'onChange' });
  const router = useRouter();

  const { reset } = useNutritionStore();

  const [loginError, setLoginError] = useState<string | null>(null);

  // 체험하기 선택 시 폼 자동 채우기
  const handleExperienceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'trial') {
      setValue('email', EMAIL);
      setValue('password', PW);
    } else {
      setValue('email', '');
      setValue('password', '');
    }

    trigger(['email', 'password']);
    setLoginError(null);
  };

  const logout = () => {
    signOut();
    reset();
  };

  const login = async (formData: LoginForm) => {
    try {
      const isLogin = await signInWithCredentials(formData);
      if (isLogin) router.push('/home');
    } catch (error) {
      if (error instanceof AuthError) {
        console.error('로그인 에러 : ', error.message);
        setLoginError(error.message);
      } else {
        setLoginError('로그인 중 문제가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(login)}
      className="flex flex-col gap-3.5 items-start w-full"
    >
      <button type="button" onClick={logout}>
        로그아웃
      </button>
      <div className="w-full">
        <label htmlFor="email" className="sr-only">
          이메일
        </label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
          className="rounded-full w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6"
          autoComplete="email"
          {...register('email', {
            required: '이메일은 필수입니다.',
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
              message: '형식에 맞지 않는 이메일입니다.',
            },
          })}
        />
        <InputError target={errors.email} />
      </div>
      <div className="w-full">
        <label htmlFor="password" className="sr-only">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="rounded-full w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6"
          autoComplete="current-password"
          {...register('password', {
            required: '비밀번호는 필수입니다.',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8자 이상이어야 합니다.',
            },
          })}
        />
        <InputError target={errors.password} />

        {loginError && (
          <p className="ml-2 mt-2 text-sm text-red-500 dark:text-red-400">
            ⚠ {loginError}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="rounded-full w-full h-14 bg-[#ffb800] text-center font-semibold leading-7 text-lg text-neutral-100 disabled:opacity-50"
      >
        로그인
      </button>

      {/* TODO: 커스텀 라디오 버튼으로 수정 */}
      <div className="w-full flex justify-start gap-8 mt-4 pl-3">
        <label
          htmlFor="auto-login"
          className="relative flex items-center space-x-2"
        >
          <input
            type="radio"
            id="auto-login"
            value="auto-login"
            className="rounded-full border border-[#d9d9d9] w-5 h-5 bg-transparent"
            {...register('experience')}
            onChange={handleExperienceChange}
          />
          <p className="text-base text-gray-500">자동 로그인</p>
        </label>

        <label htmlFor="trial" className="relative flex items-center space-x-2">
          <input
            type="radio"
            id="trial"
            value="trial"
            className="rounded-full border border-[#d9d9d9] w-5 h-5 bg-transparent"
            {...register('experience')}
            onChange={handleExperienceChange}
          />
          <p className="text-base text-gray-500">체험하기</p>
        </label>
      </div>
    </form>
  );
};

export default LoginForm;
