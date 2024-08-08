import { SettingsIcon } from '@/components/icons/IconComponents';
import BottomNav from '@/components/layout/BottomNav';
// import LogoutSheet from '@/components/LogoutSheet';
import Image from 'next/image';

const ProfilePage = () => {
  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      {/* <LogoutSheet /> */}
      <header className="text-center relative w-full h-12 px-8 py-4">
        <h1 className="font-semibold text-xl">마이페이지</h1>
        <button className="absolute right-6 top-4">
          <SettingsIcon fill="#d9d9d9" />
        </button>
      </header>
      <section className="py-2.5 px-10 flex flex-col gap-16 items-center relative w-full h-full min-h-without-header-tab">
        <div className="flex mt-10 gap-10">
          <div className="flex flex-col justify-center items-center gap-2">
            <p>⛳ 목표</p>
            <span className="font-bold text-xl">50kg</span>
          </div>

          <div className="w-[0.5px] bg-gray-300"></div>

          <div className="flex flex-col justify-center items-center gap-2">
            <p>😊 변화</p>
            <span className="font-bold text-xl">-5kg</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="rounded-full flex items-center justify-center bg-[#FFEA79]">
            <Image
              src="/images/profile_orange.png"
              alt="프로필 이미지"
              width={120}
              height={120}
            />
          </div>
          <span className="mt-4 font-semibold">User Name</span>
        </div>

        <div className="flex gap-4 w-full justify-center">
          <button className="w-32 rounded-full bg-[#FFF7E1] py-2.5">
            <p className="text-center">프로필 편집</p>
          </button>
          <button className="w-32 rounded-full bg-[#FFF7E1] py-2.5">
            <p className="text-center">목표 변경</p>
          </button>
        </div>
      </section>

      <BottomNav />
    </main>
  );
};

export default ProfilePage;
