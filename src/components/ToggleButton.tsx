'use client';

import { useState } from 'react';

const ToggleButton: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      className={`w-full py-4 px-1 flex items-center rounded-full cursor-pointer bg-point-light-orange relative`}
    >
      <div
        className={`transform transition-transform duration-300 bg-main-primary-yellow rounded-full w-[33%] py-3 flex items-center justify-center absolute top-1 bottom-1 ${activeIndex === 0 ? 'translate-x-0' : activeIndex === 1 ? 'translate-x-full' : 'translate-x-[198%]'}`}
      ></div>
      <div className="w-1/3 text-center z-10" onClick={() => toggle(0)}>
        <span className="font-medium text-gray-700">일간</span>
      </div>
      <div className="w-1/3 text-center z-10" onClick={() => toggle(1)}>
        <span className="font-medium text-gray-700">주간</span>
      </div>
      <div className="w-1/3 text-center z-10" onClick={() => toggle(2)}>
        <span className="font-medium text-gray-700">월간</span>
      </div>
    </div>
  );
};

export default ToggleButton;
