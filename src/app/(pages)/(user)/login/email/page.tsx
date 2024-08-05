import { BackArrowIcon } from '@/components/icons/IconComponents';
import Link from 'next/link';

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
        <form className="flex flex-col gap-3.5 items-start w-full">
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
                name="experience"
                className="rounded-full border border-[#d9d9d9] w-5 h-5 bg-transparent"
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
                name="experience"
                className="rounded-full border border-[#d9d9d9] w-5 h-5 bg-transparent"
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
