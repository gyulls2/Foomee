'use client';

import React, { useEffect, useState } from 'react';

type Props = {
  setIsOpened: (value: boolean) => void;
};

const WelcomeModal: React.FC<Props> = ({ setIsOpened }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="overflow-hidden fixed w-full h-full top-0 left-0 right-0 mx-auto max-w-[475px] bg-white z-10">
      <div
        className={`w-full h-full bg-black/70 flex items-center justify-center transition-opacity duration-500 ${
          isMounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="w-9/12 bg-white rounded-3xl flex flex-col justify-center items-center px-10 py-14"
          role="dialog"
          aria-modal="true"
        >
          <h2 className="font-semibold leading-7 text-2xl text-gray-900 mb-4">
            환영해요!
          </h2>
          <p>함께하기 전에 몇 가지만 알려주시면</p>
          <p>딱 맞는 목표 설정을 도와드릴게요</p>
          <button
            onClick={() => setIsOpened(false)}
            className="rounded-full w-full h-12 bg-[#ffb800] text-center font-semibold leading-7 text-base text-neutral-100 mt-8"
          >
            1분만에 목표 설정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
