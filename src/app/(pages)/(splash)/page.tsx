import Image from 'next/image';

const SplashPage = () => {
  return (
    <div className="flex flex-col justify-center items-end min-h-screen h-full px-12 py-14 bg-[#FFF9EA]">
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
    </div>
  );
};

export default SplashPage;
