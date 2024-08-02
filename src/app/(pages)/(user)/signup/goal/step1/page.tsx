import StepIndicator from '@/components/StepIndicator';

const Step1Page = () => {
  return (
    <div className="flex flex-col gap-10">
      <StepIndicator current="1" />
      <h2 className="font-semibold leading-9 text-2xl text-gray-900 mb-4">
        맞춤 목표 계산 시작!
        <br />
        기본 정보를 알려주세요
      </h2>
      <div className="flex gap-4">
        <div>
          <label
            className="text-center leading-7 text-sm text-[#757575]"
            htmlFor="age"
          >
            나이
          </label>
          <div className="relative">
            <input
              id="age"
              type="number"
              min={0}
              max={100}
              placeholder="0"
              className="rounded-lg w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6 font-semibold pr-12"
            />
            <span className="absolute bottom-4 right-6 text-gray-400 font-semibold">
              세
            </span>
          </div>
        </div>
        <div>
          <label
            className="text-center leading-7 text-sm text-[#757575]"
            htmlFor="height"
          >
            키
          </label>
          <div className="relative">
            <input
              id="height"
              type="number"
              min={0}
              max={200}
              placeholder="0"
              className="rounded-lg w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6 font-semibold pr-12"
            />
            <span className="absolute bottom-4 right-6 text-gray-400 font-semibold">
              cm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1Page;
