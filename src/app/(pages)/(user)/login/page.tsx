const LoginPage = () => {
  return (
    <div className="flex justify-center items-end min-h-screen h-full px-12 py-14 bg-[#FFF9EA]">
      <div className="flex flex-col gap-6 relative w-full bg-transparent">
        <button className="rounded-full w-full h-14 bg-[#ffb800]">
          <p className="text-center font-semibold leading-5 text-lg text-neutral-100">
            이메일로 로그인
          </p>
        </button>
        <button className="rounded-full w-full h-14 bg-[#ffb800]">
          <p className="text-center font-semibold leading-5 text-lg text-neutral-100">
            회원가입
          </p>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
