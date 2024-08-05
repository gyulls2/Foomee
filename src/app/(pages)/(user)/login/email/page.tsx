'use client';

import { BackArrowIcon } from '@/components/icons/IconComponents';
import InputError from '@/components/InputError';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

type LoginForm = {
  email: string;
  password: string;
  experience?: 'auto-login' | 'trial';
};

const EmailLoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors, isValid },
  } = useForm<LoginForm>({ mode: 'onChange' });

  const checkLogin = (formData: LoginForm) => {
    console.log('로그인 click! : ', formData);
  };

  console.log(watch('experience'));
  // TODO: 체험하기 선택하면 폼 자동 채우기

  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      <header className="relative w-full h-12 px-8 py-4">
        <Link href="/login">
          <BackArrowIcon />
        </Link>
      </header>
      <section className="py-2.5 px-10 flex flex-col gap-6 justify-center items-center relative w-full">
        <h1 className="font-semibold leading-7 text-3xl text-gray-900 mb-10">
          로그인
        </h1>
        <form
          onSubmit={handleSubmit(formData => checkLogin(formData))}
          className="flex flex-col gap-3.5 items-start w-full"
        >
          <div className="w-full">
            <label htmlFor="email" className="sr-only">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="rounded-full w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6"
              autoComplete="current-password"
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
              {...register('password', {
                required: '비밀번호는 필수입니다.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다.',
                },
              })}
            />
            <InputError target={errors.password} />
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
                // name="experience"
                value="auto-login"
                className="rounded-full border border-[#d9d9d9] w-5 h-5 bg-transparent"
                {...register('experience')}
              />
              <p className="text-base text-gray-500">자동 로그인</p>
            </label>

            <label
              htmlFor="trial"
              className="relative flex items-center space-x-2"
            >
              <input
                type="radio"
                id="trial"
                // name="experience"
                value="trial"
                className="rounded-full border border-[#d9d9d9] w-5 h-5 bg-transparent"
                {...register('experience')}
              />
              <p className="text-base text-gray-500">체험하기</p>
            </label>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EmailLoginPage;
