import React from 'react';
import Link from 'next/link';
import { BackArrowIcon } from '@/components/icons/IconComponents';
import LoginForm from './LoginForm';

const EmailLoginPage = () => {
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
        <LoginForm />
      </section>
    </main>
  );
};

export default EmailLoginPage;
