import StepIndicator from '@/components/StepIndicator';

const Step4Page = () => {
  return (
    <div className="flex flex-col min-h-full h-full">
      <div className="flex flex-col gap-10 flex-grow">
        <StepIndicator current="4" />
        <h2 className="font-semibold leading-9 text-2xl text-gray-900">
          추천 탄단지 계산 완료!
          <br />
          섭취량을 바꿀 수도 있어요
        </h2>

        <div className="flex gap-10 items-end">
          <div>
            <label
              className="text-center leading-7 text-sm text-[#757575]"
              htmlFor="start-weight"
            >
              순탄수
            </label>
            <div className="mt-2 flex items-center gap-4">
              <div className="relative w-4/6 ">
                <input
                  id="start-weight"
                  type="number"
                  placeholder="0"
                  className="rounded-lg w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6 font-semibold pr-14"
                />
                <span className="absolute bottom-4 right-6 text-gray-400 font-semibold">
                  g
                </span>
              </div>
              <span className="font-semibold text-gray-400 text-lg">X 4</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-semibold text-xl">689kcal</span>
            <span className="leading-5 text-base text-gray-400">57%</span>
          </div>
        </div>

        <div className="flex gap-10 items-end">
          <div>
            <label
              className="text-center leading-7 text-sm text-[#757575]"
              htmlFor="start-weight"
            >
              단백질
            </label>
            <div className="mt-2 flex items-center gap-4">
              <div className="relative w-4/6 ">
                <input
                  id="start-weight"
                  type="number"
                  placeholder="0"
                  className="rounded-lg w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6 font-semibold pr-14"
                />
                <span className="absolute bottom-4 right-6 text-gray-400 font-semibold">
                  g
                </span>
              </div>
              <span className="font-semibold text-gray-400 text-lg">X 4</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-semibold text-xl">689kcal</span>
            <span className="leading-5 text-base text-gray-400">57%</span>
          </div>
        </div>

        <div className="flex gap-10 items-end">
          <div>
            <label
              className="text-center leading-7 text-sm text-[#757575]"
              htmlFor="start-weight"
            >
              지방
            </label>
            <div className="mt-2 flex items-center gap-4">
              <div className="relative w-4/6 ">
                <input
                  id="start-weight"
                  type="number"
                  placeholder="0"
                  className="rounded-lg w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6 font-semibold pr-14"
                />
                <span className="absolute bottom-4 right-6 text-gray-400 font-semibold">
                  g
                </span>
              </div>
              <span className="font-semibold text-gray-400 text-lg">X 9</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-semibold text-xl">689kcal</span>
            <span className="leading-5 text-base text-gray-400">57%</span>
          </div>
        </div>

        <hr className="w-full h-0 bg-gray-300" />

        <div className="flex justify-between items-center w-full mb-4">
          <span className="font-semibold leading-5 text-lg">
            🔥 내 기초 대사량
          </span>
          <span className="font-semibold leading-5 text-2xl">1400kcal</span>
        </div>
      </div>

      <div className="mt-auto">
        <button className="rounded-full w-full h-14 bg-[#ffb800]">
          <p className="text-center font-semibold leading-5 text-lg text-neutral-100">
            다음
          </p>
        </button>
      </div>
    </div>
  );
};

export default Step4Page;
