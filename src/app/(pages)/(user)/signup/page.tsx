import { BackArrowIcon } from '@/components/icons/IconComponents';
import SignUpPolicySheet from '@/components/SignUpPolicySheet';
// import WelcomeModal from '@/components/WelcomeModal';

const SignupPage = () => {
  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      <SignUpPolicySheet />
      {/* <WelcomeModal /> */}
      <header className="relative w-full h-12 px-8 py-4">
        <button>
          <BackArrowIcon />
        </button>
      </header>
      <section className="py-2.5 px-10 flex flex-col gap-6 justify-center items-center relative w-full">
        <h1 className="font-semibold leading-7 text-3xl text-gray-900 mb-10">
          회원가입
        </h1>
        <form className="flex flex-col gap-3.5 items-start w-full">
          <label htmlFor="name" className="sr-only">
            이름
          </label>
          <input
            id="name"
            placeholder="이름을 입력하세요"
            className="rounded-full w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6"
            name="name"
          />
          <p className="ml-2 text-sm text-red-500 dark:text-red-400">
            이름은 필수입니다.
          </p>
          <label htmlFor="email" className="sr-only">
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            className="rounded-full w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6"
            name="email"
          />
          <p className="ml-2 text-sm text-red-500 dark:text-red-400">
            이메일은 필수입니다.
          </p>
          <label htmlFor="password" className="sr-only">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="rounded-full w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6"
            name="password"
          />
          <p className="ml-2 text-sm text-red-500 dark:text-red-400">
            비밀번호는 필수입니다.
          </p>
          <button
            type="submit"
            className="rounded-full w-full h-14 bg-[#ffb800] text-center font-semibold leading-7 text-lg text-neutral-100"
          >
            회원가입
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignupPage;
