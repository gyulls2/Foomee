import {
  AddIcon,
  ChevronRightIcon,
  SmileyIcon,
} from '@/components/icons/IconComponents';
import BottomNav from '@/components/layout/BottomNav';
import WeightInput from '@/components/WeightInput';
import Image from 'next/image';

const HomePage = () => {
  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      <WeightInput />

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
        <div className="flex flex-col items-center p-8 w-full main-content-min-height bg-[#FFFBF1]">
          <div className="flex flex-col items-center pb-6 flex-grow">
            <div className="border border-black py-1 px-4 rounded-full text-sm mb-4">
              귤귤님
            </div>
            <div className="relative">
              <div className="relative w-[340px] h-[340px] rounded-full overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 50%, rgba(255, 221, 134, 1) 0%, rgba(255, 221, 134, 0.8) 30%, rgba(255, 251, 241, 0) 70%)',
                  }}
                ></div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-9xl font-medium">1130</span>
                <span className="text-2xl">kcal</span>
              </div>
              <div className="absolute top-0 left-0 w-40 h-40">
                {/* TODO: 차트 삽입 */}
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-10 h-0.5 bg-black mb-6"></div>
              <p className="text-base">total 1290kcal</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full pb-8">
            <div className="bg-[#FFC632] rounded-[20px] px-4 py-6 flex flex-col">
              <h3 className="font-semibold text-white">순탄수</h3>
              <p className="text-sm text-white">0 / 54g</p>
              <div className="w-full h-1.5 bg-[#FFEDC1] rounded-full mt-10 relative">
                <div className="w-1/2 h-1.5 bg-[#FF8A00] rounded-l-full absolute top-0 left-0"></div>
              </div>
            </div>
            <div className="bg-[#FF6363] rounded-[20px] px-4 py-6 flex flex-col">
              <h3 className="font-semibold text-white">단백질</h3>
              <p className="text-sm text-white">0 / 54g</p>
              <div className="w-full h-1.5 bg-[#FFD0D0] rounded-full mt-10 relative">
                <div className="w-1/2 h-1.5 bg-[#B1004B] rounded-l-full absolute top-0 left-0"></div>
              </div>
            </div>
            <div className="bg-[#FF9C65] rounded-[20px] px-4 py-6 flex flex-col">
              <h3 className="font-semibold text-white">지방</h3>
              <p className="text-sm text-white">0 / 54g</p>
              <div className="w-full h-1.5 bg-[#FFE1D0] rounded-full mt-10 relative">
                <div className="w-1/2 h-1.5 bg-[#FF5B00] rounded-l-full absolute top-0 left-0"></div>
              </div>
            </div>
          </div>
        </div>
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
                width={36.18}
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
                height={40}
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

        {/* 체중 기록 ------------------------------------------------------------------------------------- */}
        <div className="flex flex-col bg-[#FFF9EA] p-8 w-full main-content-min-height">
          <div className="flex items-center space-x-2">
            {/* TODO:아이콘 추가 */}
            <h2 className="text-lg font-semibold">나의 변화</h2>
          </div>
          <div className="flex flex-col flex-grow justify-center items-center">
            <p className="mt-4 text-gray-600">이전보다 -0 kg</p>
            {/* input으로 변경 */}
            <h3 className="mt-2 text-6xl font-bold text-orange-600">00.0 kg</h3>
            <div className="mt-14">
              <Image
                src="/images/character_orange.png"
                alt="탱귤 캐릭터"
                width={230}
                height={269}
              />
            </div>
            <button
              type="submit"
              className="mt-10 rounded-full px-14 py-2 bg-[#ffb800] text-center font-semibold leading-7 text-lg text-neutral-100"
            >
              기록하기
            </button>
            <div className="mt-4 flex justify-center gap-1">
              <SmileyIcon width="24" height="24" />
              <p className="text-gray-600 pt-0.5">나의 BMI : 26.8</p>
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
};

export default HomePage;
