import {
  ArrowCircleIcon,
  BackArrowIcon,
} from '@/components/icons/IconComponents';
import BottomNav from '@/components/layout/BottomNav';

const AnalysisPage = () => {
  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      <header className="text-center relative w-full h-12 px-8 py-4">
        <h1 className="font-semibold text-xl">AI 식단분석</h1>
        <button className="absolute left-6 top-4">
          <BackArrowIcon />
        </button>
      </header>
      <section className="py-2.5 px-8 flex flex-col gap-16 relative w-full pt-8 h-full min-h-without-header-tab">
        <div>
          <div className="w-fit max-w-[80%] rounded-t-[20px] rounded-bl-[20px] px-8 py-3 flex justify-center items-center bg-[#ffb800] text-base mb-6 ml-auto text-right break-words">
            오늘 식단을 분석해줘!
          </div>
          <div className="w-fit max-w-[80%] rounded-t-[20px] rounded-br-[20px] px-8 py-5 flex flex-col justify-center items-start bg-[#F8F9FE] text-base mb-6 mr-auto text-left break-words">
            <span className="font-semibold mb-2">AI 비서</span>
            Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Curabitur tempus urna at turpis condimentum
            lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis
            condimentum ac, vestibulum eu nisl.
          </div>
        </div>

        <div className="mt-auto relative mb-2 justify-items-end">
          <input
            className="rounded-full w-full h-14 bg-[#F8F9FE] px-6 focus:border-orange-400 focus:outline-none"
            placeholder="오늘 식단을 분석해줘!"
          />
          <span className="absolute bottom-2.5 right-4">
            <ArrowCircleIcon width="38" height="38" fill="#ffb800" />
          </span>
        </div>
      </section>

      <BottomNav />
    </main>
  );
};

export default AnalysisPage;
