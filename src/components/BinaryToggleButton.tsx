'use client';

import { useState } from 'react';

const BinaryToggleButton: React.FC = () => {
  const [isServing, setIsServing] = useState(true);

  const toggle = () => {
    setIsServing(!isServing);
  };

  return (
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
        <span className="font-medium text-gray-700">인분 (200g)</span>
      </div>
      <div className="w-1/2 text-center z-10">
        <span className="font-medium text-gray-700">g</span>
      </div>
    </div>
  );
};

export default BinaryToggleButton;
