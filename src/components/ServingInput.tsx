'use client';

import { useState } from 'react';
import { AddIcon, RemoveIcon } from './icons/IconComponents';

const ServingInput: React.FC = () => {
  const [quantity, setQuantity] = useState<string>('1'); // 초기값을 '1'로 설정
  const [isInputting, setIsInputting] = useState(false); // 사용자가 입력 중인지 추적

  const handlePrev = () => {
    let current = parseFloat(quantity);
    if (isInputting) {
      current = Math.round(current);
      setIsInputting(false);
    }
    if (current > 0.5) {
      setQuantity((current - 0.5).toString());
    }
  };

  const handleNext = () => {
    let current = parseFloat(quantity);
    if (isInputting) {
      current = Math.round(current);
      setIsInputting(false);
    }
    setQuantity((current + 0.5).toString());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsInputting(true); // 사용자가 입력 중임을 표시
    setQuantity(value);
  };

  return (
    <div className="w-full flex items-center justify-between bg-[#FFF7E1] rounded-full py-4 px-4">
      <button
        onClick={handlePrev}
        className={`text-gray-700 rotate-180 ${isInputting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isInputting}
      >
        <RemoveIcon />
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        className="text-center font-semibold text-gray-800 bg-transparent w-12 focus:outline-none"
        min="0"
        step="0.5"
      />
      <button onClick={handleNext} className="text-gray-700">
        <AddIcon />
      </button>
    </div>
  );
};

export default ServingInput;
