import React from 'react';

const WelcomeModal: React.FC = () => {
  return (
    <div className="overflow-hidden absolute w-full min-h-screen h-full bg-black/70 z-10 flex  items-center justify-center">
      {/* TODO: 배경 이미지 추가하기 */}
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
        <button className="rounded-full w-full h-12 bg-[#ffb800] text-center font-semibold leading-7 text-base text-neutral-100 mt-8">
          1분만에 목표 설정하기
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
