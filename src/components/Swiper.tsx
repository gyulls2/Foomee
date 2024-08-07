'use client';

import { useState } from 'react';
import { ChevronRightIcon } from './icons/IconComponents';

// TODO: swiper 라이브러리로 변경
const Swiper: React.FC = () => {
  const items = ['아침', '점심', '저녁', '간식'];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex items-center justify-between bg-[#FFF7E1] rounded-full py-4 px-4 space-x-4">
      <button onClick={handlePrev} className="rotate-180">
        <ChevronRightIcon />
      </button>
      <div className="font-semibold">{items[currentIndex]}</div>
      <button onClick={handleNext}>
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default Swiper;
