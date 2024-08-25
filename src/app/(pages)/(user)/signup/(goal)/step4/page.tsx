'use client';

import StepIndicator from '@/components/StepIndicator';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// 퍼센트 계산
const getPercent = (cal: number, total: number) => {
  return ((cal / total) * 100).toFixed(0);
};

const Step4Page = () => {
  const router = useRouter();
  const { register, getValues, setValue, watch } = useFormContext();
  const calories = getValues('goal_calories');
  const carboh = watch('carbohydrates', ((calories * 0.5) / 4).toFixed(0));
  const protein = watch('protein', ((calories * 0.25) / 4).toFixed(0));
  const fat = watch('fat', ((calories * 0.25) / 9).toFixed(0));

  const [goalCal, setGoalCal] = useState(calories);

  useEffect(() => {
    setGoalCal(carboh * 4 + protein * 4 + fat * 9);
  }, [carboh, protein, fat]);

  const handleNext = () => {
    setValue('goal_calories', goalCal);
    router.push('/signup/step5');
  };

  return (
    <div className="flex flex-col min-h-full h-full">
      <div className="flex flex-col gap-8 flex-grow">
        <StepIndicator current="4" />
        <h2 className="font-semibold leading-9 text-2xl text-gray-900">
          추천 탄단지 계산 완료!
          <br />
          섭취량을 바꿀 수도 있어요
        </h2>

        <div className="flex gap-4 items-end">
          <div>
            <label
              className="text-center leading-7 text-sm text-[#757575]"
              htmlFor="carbohydrates"
            >
              탄수화물
            </label>
            <div className="mt-2 flex items-center gap-4">
              <div className="relative w-9/12">
                <input
                  id="carbohydrates"
                  type="number"
                  placeholder="0"
                  className="rounded-lg w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6 font-semibold pr-14"
                  defaultValue={((calories * 0.5) / 4).toFixed(0)}
                  {...register('carbohydrates', { required: true })}
                />
                <span className="absolute bottom-4 right-6 text-gray-400 font-semibold">
                  g
                </span>
              </div>
              <span className="font-semibold text-gray-400 text-lg">X 4</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 w-[30%]">
            <span className="font-semibold text-xl">{carboh * 4 || 0}kcal</span>
            <span className="leading-5 text-base text-gray-400">
              {getPercent(carboh * 4, goalCal) || 0}%
            </span>
          </div>
        </div>

        <div className="flex gap-4 items-end">
          <div>
            <label
              className="text-center leading-7 text-sm text-[#757575]"
              htmlFor="protein"
            >
              단백질
            </label>
            <div className="mt-2 flex items-center gap-4">
              <div className="relative w-9/12">
                <input
                  id="protein"
                  type="number"
                  placeholder="0"
                  className="rounded-lg w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6 font-semibold pr-14"
                  defaultValue={((calories * 0.25) / 4).toFixed(0)}
                  {...register('protein', { required: true })}
                />
                <span className="absolute bottom-4 right-6 text-gray-400 font-semibold">
                  g
                </span>
              </div>
              <span className="font-semibold text-gray-400 text-lg">X 4</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 w-[30%]">
            <span className="font-semibold text-xl">
              {protein * 4 || 0}kcal
            </span>
            <span className="leading-5 text-base text-gray-400">
              {getPercent(protein * 4, goalCal) || 0}%
            </span>
          </div>
        </div>

        <div className="flex gap-4 items-end">
          <div>
            <label
              className="text-center leading-7 text-sm text-[#757575]"
              htmlFor="fat"
            >
              지방
            </label>
            <div className="mt-2 flex items-center gap-4">
              <div className="relative w-9/12">
                <input
                  id="fat"
                  type="number"
                  placeholder="0"
                  className="rounded-lg w-full h-14 bg-[#fff7e1] focus:outline-none focus:border-orange-400 px-6 font-semibold pr-14"
                  defaultValue={((calories * 0.25) / 9).toFixed(0)}
                  {...register('fat', { required: true })}
                />
                <span className="absolute bottom-4 right-6 text-gray-400 font-semibold">
                  g
                </span>
              </div>
              <span className="font-semibold text-gray-400 text-lg">X 9</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 w-[30%]">
            <span className="font-semibold text-xl">{fat * 9 || 0}kcal</span>
            <span className="leading-5 text-base text-gray-400">
              {getPercent(fat * 9, goalCal) || 0}%
            </span>
          </div>
        </div>

        <hr className="w-full h-0 bg-gray-300" />

        <div className="flex justify-between items-center w-full mb-8">
          <span className="font-semibold leading-5 text-lg">
            🔥 내 기초 대사량
          </span>
          <span className="font-semibold leading-5 text-2xl">
            {goalCal || 0}kcal
          </span>
        </div>
      </div>

      <div className="mt-auto">
        <button
          onClick={handleNext}
          className="rounded-full w-full h-14 bg-[#ffb800]"
        >
          <p className="text-center font-semibold leading-5 text-lg text-neutral-100">
            다음
          </p>
        </button>
      </div>
    </div>
  );
};

export default Step4Page;
