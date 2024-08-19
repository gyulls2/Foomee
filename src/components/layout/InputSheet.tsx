import React from 'react';
import { CloseIcon } from '../icons/IconComponents';
import { useForm } from 'react-hook-form';

type Props = {
  title: string;
  goalCal: number;
  setIsOpen: (state: boolean) => void;
  setGoalCal: (cal: number) => void;
};

type InputType = {
  kcal: number;
};

const InputSheet: React.FC<Props> = ({
  title,
  setIsOpen,
  goalCal,
  setGoalCal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<InputType>({ mode: 'onChange' });

  const handleChangeGoal = (data: InputType) => {
    setGoalCal(data.kcal);
    setIsOpen(false);
  };

  return (
    <div className="overflow-hidden fixed w-[475px] h-full top-0 left-[50%] translate-x-[-50%] bg-black/70 z-10">
      <div className="max-w-[475px] bg-white rounded-t-3xl py-14 px-12 flex flex-col gap-12 fixed bottom-0">
        <button
          className="absolute top-10 right-10"
          onClick={() => setIsOpen(false)}
        >
          <span className="sr-only">닫기</span>
          <CloseIcon />
        </button>
        <h2 className="leading-5 text-xl text-gray-900">{title}</h2>
        <div>
          <form
            className="relative mt-2"
            onSubmit={handleSubmit(handleChangeGoal)}
          >
            <input
              id="kcal"
              type="number"
              defaultValue={goalCal}
              placeholder="0"
              maxLength={4}
              className="w-full text-4xl focus:outline-none focus:border-orange-400 font-semibold text-right pr-40"
              {...register('kcal', {
                required: true,
                max: 3000,
              })}
            />
            <span className="absolute top-1 right-28 text-gray-400 text-2xl">
              kcal
            </span>
            <button
              type="submit"
              className="rounded-full w-full h-12 mt-12 bg-[#ffb800] text-center font-semibold leading-7 text-lg text-neutral-100 disabled:opacity-50"
              disabled={!isValid || isSubmitting}
            >
              저장
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputSheet;
