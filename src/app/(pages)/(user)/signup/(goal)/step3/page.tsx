'use client';

import Image from 'next/image';
import StepIndicator from '@/components/StepIndicator';
import { ChevronRightIcon } from '@/components/icons/IconComponents';
import { useFormContext } from 'react-hook-form';
import InputSheet from '@/components/layout/InputSheet';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 기초대사량 계산
const getBMR = (
  gender: string,
  weight: number,
  height: number,
  age: number,
) => {
  if (gender === 'male') {
    return 66.47 + 13.75 * weight + 5 * height - 6.76 * age;
  } else if (gender === 'female') {
    return 655.1 + 9.56 * weight + 1.85 * height - 4.68 * age;
  }
};

// 활동대사량 계산
const activityLevels = {
  1: 1.2,
  2: 1.375,
  3: 1.55,
  4: 1.725,
  5: 1.9,
};
type ActivityLevel = keyof typeof activityLevels;
const getAMR = (bmr: number, activityLevel: ActivityLevel) => {
  return bmr * activityLevels[activityLevel];
};

// 추천 목표 칼로리 계산
const getGoal = (amr: number) => {
  return amr - 500;
};

const Step3Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { getValues, setValue } = useFormContext();
  const gender = getValues('gender');
  const weight = getValues('starting_weight');
  const height = getValues('height');
  const age = getValues('age');
  const activityLevel = getValues('activity-level');

  const bmr = getBMR(gender, weight, height, age)?.toFixed(0);
  const amr = getAMR(Number(bmr), activityLevel)?.toFixed(0);
  const [goalCal, setGoalCal] = useState(getGoal(Number(amr)));

  const handleNext = () => {
    setValue('goal_calories', goalCal);
    router.push('/signup/step4');
  };

  return (
    <div className="flex flex-col min-h-full h-full relative">
      {isOpen && (
        <InputSheet
          title="목표 입력"
          setIsOpen={setIsOpen}
          goalCal={goalCal}
          setGoalCal={setGoalCal}
        />
      )}
      <div className="flex flex-col gap-10 flex-grow">
        <StepIndicator current="3" />
        <h2 className="font-semibold leading-9 text-2xl text-gray-900">
          추천 계획 완성!
          <br />
          목표를 바꿀 수도 있어요
        </h2>

        <div>
          <div className="flex justify-between items-center w-full mb-4">
            <span className="font-semibold leading-5 text-base text-gray-400">
              🔥 내 기초 대사량
            </span>
            <span className="font-semibold leading-5 text-base text-gray-400">
              {bmr}kcal
            </span>
          </div>
          <div className="flex justify-between items-center w-full">
            <span className="font-semibold leading-5 text-base text-gray-400">
              👟내 활동 대사량
            </span>
            <span className="font-semibold leading-5 text-base text-gray-400">
              {amr}kcal
            </span>
          </div>
        </div>

        <div className="relative mt-6">
          <div className="w-2/3 h-14 rounded-t-full rounded-bl-full px-4 py-3 flex justify-center items-center bg-[#ffea79] text-base mb-6">
            <span className="font-semibold">{getGoal(Number(amr))}kcal</span>를
            추천!
          </div>

          <div className="rounded-xl w-full bg-[#fff7e1] flex justify-between items-end py-10 px-10">
            <div className="flex flex-col gap-3 font-semibold">
              내 목표 칼로리
              <span className="leading-5 text-3xl">{goalCal}kcal</span>
            </div>
            <button
              className="rounded-full bg-[#ffb800] px-5 py-2"
              onClick={() => setIsOpen(true)}
            >
              <p className="text-center leading-5 text-neutral-100">
                목표 수정
              </p>
            </button>
          </div>

          <Image
            src="/images/character_peach.png"
            alt="Peach Character"
            width={113.88}
            height={100}
            className="absolute top-0 right-2"
          />
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex justify-between items-center my-4 px-2">
          <span className="leading-5 text-base text-gray-400">
            칼로리 계산법이 궁금하다면?
          </span>
          <button className="flex items-center">
            <span className="font-semibold leading-5 text-base text-gray-900">
              자세히
            </span>
            <ChevronRightIcon />
          </button>
        </div>
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

export default Step3Page;
