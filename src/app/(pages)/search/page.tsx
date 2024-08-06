import AddFoodSheet from '@/components/layout/AddFoodSheet';
import {
  BackArrowIcon,
  SearchIcon,
  SmileyIcon,
  AddIcon,
} from '@/components/icons/IconComponents';
import BottomNav from '@/components/layout/BottomNav';

const SearchPage = () => {
  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      <AddFoodSheet />

      <header className="flex text-center relative w-full px-4 py-4 gap-3 items-center">
        <button>
          <BackArrowIcon />
        </button>
        <div className="relative flex-grow">
          <input
            className="rounded-full w-full h-10 bg-[#F5F5F5] pl-12 pr-4 focus:border-orange-400 focus:outline-none"
            placeholder="무슨 음식을 드셨나요?"
          />
          <span className="absolute bottom-2 left-4">
            <SearchIcon />
          </span>
        </div>
        <div className="flex justify-center items-center bg-[#F5F5F5] rounded-full h-10 w-10">
          <span className="font-bold text-gray-400">0</span>
        </div>
      </header>
      <section className="px-8 flex flex-col gap-8 relative w-full h-full search-section-min-height bg-[#FFFBF1] items-center py-4">
        {/* <div className="flex flex-col gap-8 items-center my-auto">
          <SmileyIcon />
          <h2>오늘 먹은 음식을 검색해보세요</h2>
        </div> */}

        <div className="w-full">
          <div className="flex items-center justify-between px-8 py-6 bg-white rounded-2xl">
            <div>
              <span className="text-lg font-semibold">된장찌개</span>
              <p className="text-sm text-gray-500 pt-1">1인분 (200g)</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button className="w-8 h-8 flex items-center justify-center bg-[#FFB800] rounded-full">
                <AddIcon fill="#ffffff" />
              </button>
              <span className="text-sm font-medium text-gray-500">92kcal</span>
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
};

export default SearchPage;
