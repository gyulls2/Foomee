import React from 'react';
import { CloseIcon } from './icons/IconComponents';

const WeightInput: React.FC = () => {
  return (
    <div className="overflow-hidden absolute w-full min-h-screen h-full bg-black/70 z-10 flex flex-col justify-end">
      <div className="relative w-full bg-white rounded-t-3xl py-14 px-12 flex flex-col gap-12">
        <button className="absolute top-10 right-10">
          <span className="sr-only">닫기</span>
          <CloseIcon />
        </button>
        <h2 className="leading-5 text-xl text-gray-900">체중 입력</h2>
        <div>
          <div className="relative mt-2">
            <input
              id="target-weight"
              type="text"
              placeholder="00.0"
              maxLength={6}
              className="w-full text-4xl focus:outline-none focus:border-orange-400 pl-32 font-semibold pr-14"
            />
            <span className="absolute bottom-1 right-24 text-gray-400 text-2xl">
              kg
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="rounded-full w-full h-12 bg-[#ffb800] text-center font-semibold leading-7 text-lg text-neutral-100"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default WeightInput;
