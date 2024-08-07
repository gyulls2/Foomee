import { AddIcon, ChevronRightIcon } from '@/components/icons/IconComponents';
import BottomNav from '@/components/layout/BottomNav';
import WeightInputSheet from '@/components/layout/WeightInputSheet';
import Image from 'next/image';
import WeightForm from './WeightForm';
import { Main } from 'next/document';
import MainSection from './MainSection';

const HomePage = () => {
  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      {/* <WeightInputSheet /> */}
      <header className="flex items-center justify-between w-full px-8 py-4">
        <button aria-label="이전 날짜" className="rotate-180">
          <ChevronRightIcon width="30" height="30" />
        </button>
        <h1 className="text-lg font-semibold">8.5 (월)</h1>
        <button aria-label="다음 날짜">
          <ChevronRightIcon width="30" height="30" />
        </button>
      </header>
      <section className="flex flex-col relative w-full h-full main-content-min-height">
        {/* 메인 페이지 ---------------------------------------------------------------------------------------------- */}
        <MainSection />
        {/* 식단 기록 ------------------------------------------------------------------------------------- */}
        <div className="flex flex-col bg-[#FFECBA] p-8 w-full">
          <div className="flex items-center space-x-2 mb-4">
            {/* TODO:아이콘 추가 */}
            <h2 className="text-lg font-semibold">먹었어요</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 w-full p-4 pb-10">
            <div className="bg-[#8BC60F] rounded-[20px] px-6 py-6 flex flex-col justify-between relative h-44">
              <Image
                src="/images/asset_tomato.png"
                alt="아침"
                width={40}
                height={40}
              />
              <div>
                <h3 className="font-semibold text-white">아침</h3>
                <p className="text-white">0 kcal</p>
              </div>
              <button className="absolute top-6 right-6">
                <AddIcon width="36" height="36" fill="#ffffff" />
              </button>
            </div>
            <div className="bg-[#FF8E25] rounded-[20px] px-6 py-6 flex flex-col justify-between relative h-44">
              <Image
                src="/images/asset_lime.png"
                alt="점심"
                width={40}
                height={40}
              />
              <div>
                <h3 className="font-semibold text-white">점심</h3>
                <p className="text-white">0 kcal</p>
              </div>
              <button className="absolute top-6 right-6">
                <AddIcon width="36" height="36" fill="#ffffff" />
              </button>
            </div>
            <div className="bg-[#2AB58B] rounded-[20px] px-6 py-6 flex flex-col justify-between relative h-44">
              <Image
                src="/images/asset_egg.png"
                alt="저녁"
                width={36}
                height={45}
              />
              <div>
                <h3 className="font-semibold text-white">저녁</h3>
                <p className="text-white">0 kcal</p>
              </div>
              <button className="absolute top-6 right-6">
                <AddIcon width="36" height="36" fill="#ffffff" />
              </button>
            </div>
            <div className="bg-[#FF7066] rounded-[20px] px-6 py-6 flex flex-col justify-between relative h-44">
              <Image
                src="/images/asset_avocado.png"
                alt="간식"
                width={45}
                height={66}
              />
              <div>
                <h3 className="font-semibold text-white">간식</h3>
                <p className="text-white">0 kcal</p>
              </div>
              <button className="absolute top-6 right-6">
                <AddIcon width="36" height="36" fill="#ffffff" />
              </button>
            </div>
          </div>
        </div>

        {/* 체중 기록 -------------------------------------------------------- */}
        <WeightForm />
      </section>

      <BottomNav />
    </main>
  );
};

export default HomePage;
