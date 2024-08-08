import {
  AddIcon,
  CloseIcon,
  ImageIcon,
} from '@/components/icons/IconComponents';
import Image from 'next/image';

const MealsPage = () => {
  return (
    <main className="w-full mx-auto min-h-screen h-full bg-[#FFECBA]">
      <header className="relative w-full px-8 py-6 text-right">
        <button>
          <span className="sr-only">닫기</span>
          <CloseIcon />
        </button>
      </header>
      <section className="flex flex-col h-full min-h-without-header">
        <div className="text-center px-8 py-20">
          <div className="flex justify-center mb-4">
            <div className="relative w-36 h-36 rounded-full bg-[#FFB800] flex flex-col justify-center items-center">
              <Image
                src="/images/asset_tomato.png"
                alt="breakfast"
                width={80}
                height={80}
              />
              <div className="absolute bottom-0.5 right-0.5 bg-white p-1.5 rounded-full">
                <ImageIcon />
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">92 kcal</div>
          <p className="text-gray-600 mb-10">먹었어요</p>
          <div className="flex justify-around border-t border-gray-300 pt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">순탄수</p>
              <p className="text-lg font-semibold">5.7g</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">단백질</p>
              <p className="text-lg font-semibold">6.8g</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">지방</p>
              <p className="text-lg font-semibold">3.3g</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 flex-grow">
          <div className="mb-4">
            <h2 className="text-xl">
              아침 메뉴 <span className="text-[#FF7A00]">1</span>
            </h2>
            <div className="flex justify-between items-center py-8 border-b">
              <div>
                <p className="mb-2">된장찌개</p>
                <p className="text-sm text-gray-400">1인분 (200g)</p>
              </div>
              <div className="flex text-right gap-2">
                <p className="font-semibold">92kcal</p>
                <button>
                  <CloseIcon width="18" height="18" fill="#b3b3b3" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center py-8 border-b">
              <div>
                <p className="mb-2">된장찌개</p>
                <p className="text-sm text-gray-400">1인분 (200g)</p>
              </div>
              <div className="flex text-right gap-2">
                <p className="font-semibold">92kcal</p>
                <button>
                  <CloseIcon width="18" height="18" fill="#b3b3b3" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-white p-8 mx-auto max-w-[475px]">
          <div className="flex gap-4 w-full">
            <button className="w-4/12 rounded-full h-12 border-2 border-[#ffb800] text-center font-semibold leading-7 text-lg text-[#ffb800] flex justify-center items-center gap-1 pr-2">
              <AddIcon fill="#ffb800" />
              <p>추가</p>
            </button>
            <button
              type="submit"
              className="flex-grow rounded-full h-12 bg-[#ffb800] text-center font-semibold leading-7 text-lg text-neutral-100"
            >
              <p>수정 완료</p>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MealsPage;
