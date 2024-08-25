'use client';

import StepIndicator from '@/components/StepIndicator';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

const Step2Page = () => {
  const {
    register,
    trigger,
    formState: { isValid },
  } = useFormContext();
  const router = useRouter();

  const handleNext = async () => {
    const isValid = await trigger(['starting_weight', 'goal-weight']);
    if (isValid) {
      router.push('/signup/step3');
    }
  };

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
              htmlFor="starting_weight"
            >
              시작 체중
            </label>
            <div className="relative mt-2">
              <input
                id="starting_weight"
                type="number"
                placeholder="0"
                className="rounded-lg w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6 font-semibold pr-14"
                {...register('starting_weight', {
                  required: '시작 체중은 필수입니다.',
                  min: 1,
                  max: 200,
                })}
              />
              <span className="absolute bottom-4 right-6 text-gray-400 font-semibold">
                kg
              </span>
            </div>
          </div>
          <div>
            <label
              className="text-center leading-7 text-sm text-[#757575]"
              htmlFor="goal-weight"
            >
              목표 체중
            </label>
            <div className="relative mt-2">
              <input
                id="goal_weight"
                type="number"
                placeholder="0"
                className="rounded-lg w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6 font-semibold pr-14"
                {...register('goal_weight', {
                  required: '목표 체중은 필수입니다.',
                  min: 1,
                  max: 200,
                })}
              />
              <span className="absolute bottom-4 right-6 text-gray-400 font-semibold">
                kg
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <button
          className="rounded-full w-full h-14 bg-[#ffb800] disabled:opacity-50"
          disabled={!isValid}
          onClick={handleNext}
        >
          <p className="text-center font-semibold leading-5 text-lg text-neutral-100">
            다음
          </p>
        </button>
      </div>
    </div>
  );
};

export default Step2Page;
