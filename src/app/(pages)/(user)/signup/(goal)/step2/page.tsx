import StepIndicator from '@/components/StepIndicator';

const Step2Page = () => {
  return (
    <div className="flex flex-col min-h-full h-full">
      <div className="flex flex-col gap-10 flex-grow">
        <StepIndicator current="2" />
        <h2 className="font-semibold leading-9 text-2xl text-gray-900">
          목표 체중도 알려주시면
          <br />
          추천 계획을 짜볼게요
        </h2>

        <div className="flex gap-4">
          <div>
            <label
              className="text-center leading-7 text-sm text-[#757575]"
              htmlFor="start-weight"
            >
              시작 체중
            </label>
            <div className="relative mt-2">
              <input
                id="start-weight"
                type="number"
                placeholder="0"
                className="rounded-lg w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6 font-semibold pr-14"
              />
              <span className="absolute bottom-4 right-6 text-gray-400 font-semibold">
                세
              </span>
            </div>
          </div>
          <div>
            <label
              className="text-center leading-7 text-sm text-[#757575]"
              htmlFor="target-weight"
            >
              목표 체중
            </label>
            <div className="relative mt-2">
              <input
                id="target-weight"
                type="number"
                placeholder="0"
                className="rounded-lg w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6 font-semibold pr-14"
              />
              <span className="absolute bottom-4 right-6 text-gray-400 font-semibold">
                kg
              </span>
            </div>
          </div>
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

export default Step2Page;
