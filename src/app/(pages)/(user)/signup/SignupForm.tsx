'use client';

import InputError from '@/components/InputError';
import { signInWithCredentials } from '@/data/actions/authAction';
import { signup } from '@/data/actions/userAction';
import { UserForm } from '@/types';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>();
  const router = useRouter();

  const onSubmit = async (data: UserForm) => {
    data.type = 'user';
    const user = await signup(data);

    // 자동 로그인 처리
    if (user) {
      const isLogin = await signInWithCredentials({
        email: data.email,
        password: data.password,
      });
      if (isLogin) router.push('/signup/step1');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3.5 items-start w-full"
    >
      <label htmlFor="name" className="sr-only">
        이름
      </label>
      <input
        id="name"
        placeholder="이름을 입력하세요"
        className="rounded-full w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6"
        {...register('name', { required: '이름은 필수입니다.' })}
      />
      <InputError target={errors.name} />
      <label htmlFor="email" className="sr-only">
        이메일
      </label>
      <input
        id="email"
        type="email"
        placeholder="이메일을 입력하세요"
        className="rounded-full w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6"
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

      <button
        type="submit"
        className="rounded-full w-full h-14 bg-[#ffb800] text-center font-semibold leading-7 text-lg text-neutral-100"
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
