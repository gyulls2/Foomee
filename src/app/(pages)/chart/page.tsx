import BottomNav from '@/components/layout/BottomNav';
import ToggleButton from '@/components/ToggleButton';
import Slider from './Slider';

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
        <Slider />
        <ToggleButton />
      </section>

      <BottomNav />
    </main>
  );
};

export default ChartPage;
