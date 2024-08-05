import React from 'react';
import { ChevronRightIcon } from './icons/IconComponents';

const LogoutSheet: React.FC = () => {
  return (
    <div className="overflow-hidden absolute w-full min-h-screen h-full bg-black/70 z-10 flex flex-col justify-end">
      <div className="relative w-full bg-white rounded-t-3xl py-14 px-12 flex flex-col gap-12">
        <div className="w-full flex flex-col gap-6 items-center">
          <div className="w-full flex items-center gap-2">
            <p className="leading-7 text-base text-gray-900">로그아웃</p>
            <button className="ml-auto">
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutSheet;
