import React from 'react';
import {
  BoltIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from './icons/IconComponents';
import Swiper from './Swiper';
import BinaryToggleButton from './BinaryToggleButton';
import ServingInput from './ServingInput';

const AddFoodSheet: React.FC = () => {
  return (
    <div className="overflow-hidden absolute w-full min-h-screen h-full bg-black/70 z-10 flex flex-col justify-end">
      <div className="relative w-full bg-white rounded-t-3xl py-14 px-12 flex flex-col gap-8">
        <h2 className="font-semibold leading-5 text-2xl">된짱찌개</h2>
        <div className="w-full flex flex-col gap-6 items-center">
          {/* 칼로리 카드 */}
          <div className="w-full">
            <div className="flex flex-col items-center justify-between px-8 py-6 bg-[#FFF7E1] rounded-2xl text-center">
              <div className="flex justify-center space-x-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold">
                    탄
                  </div>
                  <span className="font-semibold">0%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold">
                    단
                  </div>
                  <span className="font-semibold">0%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold">
                    지
                  </div>
                  <span className="font-semibold">0%</span>
                </div>
              </div>
              <div className="font-semibold text-xl">92kcal</div>
            </div>
          </div>

          {/* 인분/그람 선택 */}
          <BinaryToggleButton />

          {/* 용량 입력 */}
          <ServingInput />

          {/* 끼니 선택 */}
          <Swiper />
        </div>
        <div className="flex gap-4 w-full">
          <button
            type="submit"
            className="w-4/12 rounded-full h-12 border-2 border-[#ffb800] text-center font-semibold leading-7 text-lg text-[#ffb800]"
          >
            음식 상세
          </button>
          <button
            type="submit"
            className="flex-grow rounded-full h-12 bg-[#ffb800] text-center font-semibold leading-7 text-lg text-neutral-100 flex justify-center items-center gap-1 pr-2"
          >
            <BoltIcon />
            <p>빠른 추가</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFoodSheet;
