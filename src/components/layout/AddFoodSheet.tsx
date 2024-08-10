import React, { useState } from 'react';
import {
  AddIcon,
  BoltIcon,
  ChevronRightIcon,
  RemoveIcon,
} from '../icons/IconComponents';
import Swiper from '../Swiper';
import BinaryToggleButton from '../BinaryToggleButton';
import ServingInput from '../ServingInput';

const AddFoodSheet: React.FC = ({ foodData, setIsOpened }) => {
  const {
    FOOD_NM_KR: name,
    AMT_NUM1: enerc,
    AMT_NUM7: chocdf,
    AMT_NUM3: prot,
    AMT_NUM4: fatce,
    SERVING_SIZE: size,
    Z10500: serving,
  } = foodData;
  const [isServing, setIsServing] = useState(true);
  const [quantity, setQuantity] = useState<string>('1'); // 초기값을 '1'로 설정
  const [isInputting, setIsInputting] = useState(false); // 사용자가 입력 중인지 추적
  const items = ['아침', '점심', '저녁', '간식'];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCloseSheet = (e: React.MouseEvent) => {
    // 클릭된 요소가 배경일 경우에만 시트를 닫음
    if (e.target === e.currentTarget) {
      setIsOpened(false);
    }
  };

  // 인분/그램 선택 토글
  const toggle = () => {
    setIsServing(!isServing);
    if (isServing) {
      setQuantity('100');
    } else {
      setQuantity('1');
    }
  };

  // 섭취량 조절 버튼(minus)
  const handleSubtract = () => {
    let current = parseFloat(quantity);
    if (isInputting) {
      current = Math.round(current);
      setIsInputting(false);
    }
    if (current > 0.5) {
      setQuantity((current - 0.5).toString());
    }
  };

  // 섭취량 조절 버튼(plus)
  const handleAdd = () => {
    let current = parseFloat(quantity);
    if (isInputting) {
      current = Math.round(current);
      setIsInputting(false);
    }
    setQuantity((current + 0.5).toString());
  };

  // 섭취량 입력창 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsInputting(true); // 사용자가 입력 중임을 표시
    setQuantity(value);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit');
    // TODO: 서버로 데이터 전송
    // 섭취량에 따른 칼로리, 탄단지 계산
    // 필요한 데이터: (인분/그램)섭취량, 끼니, 음식명, 칼로리, 탄단지
  };

  console.log(foodData);

  return (
    <div
      className="overflow-hidden absolute w-full min-h-screen h-full bg-black/70 z-10 flex flex-col justify-end"
      onClick={handleCloseSheet}
    >
      <div className="max-w-[475px] w-full bg-white rounded-t-3xl py-14 px-12 flex flex-col gap-8 fixed bottom-0">
        <h2 className="font-semibold leading-5 text-2xl">
          {name.replaceAll('_', ' ')}
        </h2>
        <div className="w-full flex flex-col gap-6 items-center">
          {/* 칼로리 카드 */}
          <div className="w-full">
            <div className="flex flex-col items-center justify-between px-8 py-6 bg-[#FFF7E1] rounded-2xl text-center">
              <div className="flex justify-center space-x-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold">
                    탄
                  </div>
                  <span className="font-semibold">{chocdf}g</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold">
                    단
                  </div>
                  <span className="font-semibold">{prot}g</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold">
                    지
                  </div>
                  <span className="font-semibold">{fatce}g</span>
                </div>
              </div>
              <div className="font-semibold text-xl">{enerc}kcal</div>
            </div>
          </div>
          <form
            id="addFood"
            onSubmit={onSubmit}
            className="w-full flex flex-col gap-4"
          >
            {/* 인분/그람 선택 */}
            {/* <BinaryToggleButton /> */}
            <div
              className={`w-full py-4 px-1 flex items-center rounded-full cursor-pointer bg-[#FFF7E1] relative`}
              onClick={toggle}
            >
              <div
                className={`${
                  isServing ? 'translate-x-0' : 'translate-x-full'
                } transform transition-transform duration-300 bg-white rounded-full w-[49%] py-3 flex items-center justify-center absolute top-1 bottom-1`}
              ></div>
              <div className="w-1/2 text-center z-10">
                <span className="font-medium text-gray-700">인분 ({size})</span>
              </div>
              <div className="w-1/2 text-center z-10">
                <span className="font-medium text-gray-700">g</span>
              </div>
            </div>

            {/* 용량 입력 */}
            {/* <ServingInput /> */}
            <div className="w-full flex items-center justify-between bg-[#FFF7E1] rounded-full py-4 px-4">
              <button
                onClick={handleSubtract}
                className={`text-gray-700 rotate-180 ${isInputting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isInputting}
              >
                <RemoveIcon />
              </button>
              {isServing ? (
                <input
                  type="number"
                  value={quantity}
                  onChange={handleChange}
                  className="text-center font-semibold text-gray-800 bg-transparent w-12 focus:outline-none"
                  min="0"
                  step="0.5"
                />
              ) : (
                <input
                  type="number"
                  value={quantity}
                  defaultValue={100}
                  onChange={handleChange}
                  className="text-center font-semibold text-gray-800 bg-transparent w-12 focus:outline-none"
                  min="0"
                  step="0.5"
                />
              )}
              <button onClick={handleAdd} className="text-gray-700">
                <AddIcon />
              </button>
            </div>

            {/* 끼니 선택 */}
            {/* <Swiper /> */}
            <div className="w-full flex items-center justify-between bg-[#FFF7E1] rounded-full py-4 px-4 space-x-4">
              <button onClick={handlePrev} className="rotate-180">
                <ChevronRightIcon />
              </button>
              <div className="font-semibold">{items[currentIndex]}</div>
              <button onClick={handleNext}>
                <ChevronRightIcon />
              </button>
            </div>
          </form>
        </div>
        <div className="flex gap-4 w-full">
          <button className="w-4/12 rounded-full h-12 border-2 border-[#ffb800] text-center font-semibold leading-7 text-lg text-[#ffb800]">
            음식 상세
          </button>
          <button
            type="submit"
            form="addFood"
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
