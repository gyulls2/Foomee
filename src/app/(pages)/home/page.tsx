import { ChevronRightIcon } from '@/components/icons/IconComponents';
import BottomNav from '@/components/layout/BottomNav';
// import WeightInputSheet from '@/components/layout/WeightInputSheet';
import WeightForm from './WeightForm';
import MainSection from './MainSection';
import MealSection from './MealSection';

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
      <section className="flex flex-col relative w-full h-full min-h-without-header-tab">
        {/* 메인 페이지 ---------------------------------------------------------------------------------------------- */}
        <MainSection />
        {/* 식단 기록 ------------------------------------------------------------------------------------- */}
        <div className="flex flex-col bg-[#FFECBA] p-8 w-full">
          <div className="flex items-center space-x-2 mb-4">
            {/* TODO:아이콘 추가 */}
            <h2 className="text-lg font-semibold">먹었어요</h2>
          </div>
          <MealSection />
        </div>

        {/* 체중 기록 -------------------------------------------------------- */}
        <WeightForm />
      </section>

      <BottomNav />
    </main>
  );
};

export default HomePage;
