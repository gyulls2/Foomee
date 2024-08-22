import BottomNav from '@/components/layout/BottomNav';
import ToggleButton from '@/components/ToggleButton';
import WeightChart from './WeightChart';

const ChartPage = () => {
  return (
    <main className="flex-col justify-center min-h-screen h-full ">
      <section className="pb-20 px-8 flex flex-col gap-6 relative w-full pt-8 h-full min-h-without-tab bg-bg-light-yellow">
        <div>
          <h2 className="text-lg font-semibold">
            오늘 하루 2000kcal 먹었어요.
          </h2>
          <p className="mt-2">⛳ 목표 50kg 😊 지금까지 -5kg</p>
        </div>
        {/* 체중 차트 */}
        <div className="w-full h-40">
          <WeightChart />
        </div>
        <svg width="100%" height="6px">
          <line
            x1="0"
            y1="0"
            x2="420"
            y2="0"
            stroke="#FFECBA"
            strokeWidth="6"
            strokeDasharray="8,6"
          />
        </svg>
        {/* 식단 차트 */}
        <div className="w-full h-72 bg-white">식단 bar 차트</div>
        <ToggleButton />
      </section>

      <BottomNav />
    </main>
  );
};

export default ChartPage;
