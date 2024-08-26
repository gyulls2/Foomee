import Image from 'next/image';
import Link from 'next/link';
import OAuthButtons from './OAuthButtons';

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-end min-h-screen h-full px-12 py-8 bg-[#FFF9EA]">
      <div className="w-full flex-grow flex flex-col justify-center items-center gap-4">
        <Image
          src="/images/logo_icon.png"
          alt="fomee 아이콘"
          width={80}
          height={80}
        />
        <Image
          src="/images/logo_text.png"
          alt="foomee"
          width={198}
          height={70}
        />
      </div>

      <div className="flex flex-col gap-4 relative w-full bg-transparent">
        <Link
          href="login/email"
          className="rounded-full w-full py-5 bg-[#ffb800]"
        >
          <p className="text-center font-semibold leading-5 text-lg text-neutral-100">
            이메일로 로그인
          </p>
        </Link>
        <Link href="/signup" className="rounded-full w-full py-5 bg-[#ffb800]">
          <p className="text-center font-semibold leading-5 text-lg text-neutral-100">
            회원가입
          </p>
        </Link>
        <OAuthButtons />
      </div>
    </div>
  );
};

export default LoginPage;
