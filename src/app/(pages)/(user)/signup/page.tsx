import { BackArrowIcon } from '@/components/icons/IconComponents';
import SignupForm from './SignupForm';
import Link from 'next/link';
// import SignUpPolicySheet from '@/components/layout/SignUpPolicySheet';

const SignupPage = () => {
  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      {/* <SignUpPolicySheet /> */}
      <header className="relative w-full h-12 px-8 py-4">
        <Link href="/login">
          <BackArrowIcon />
        </Link>
      </header>
      <section className="py-2.5 px-10 flex flex-col gap-6 items-center relative w-full min-h-without-header">
        <h1 className="font-semibold leading-7 text-3xl text-gray-900 mb-10">
          회원가입
        </h1>
        <SignupForm />
      </section>
    </main>
  );
};

export default SignupPage;
