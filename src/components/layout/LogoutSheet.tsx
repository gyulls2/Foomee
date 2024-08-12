import React from 'react';
import { ChevronRightIcon } from '../icons/IconComponents';
import { signOut } from 'next-auth/react';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const LogoutSheet: React.FC<Props> = ({ setIsOpen }) => {
  const handleSighOut = async () => {
    await signOut({ callbackUrl: '/login' });
    setIsOpen(false);
  };

  const handleCloseSheet = (e: React.MouseEvent) => {
    // 클릭된 요소가 배경일 경우에만 시트를 닫음
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="overflow-hidden absolute w-full min-h-screen h-full bg-black/70 z-10 flex flex-col justify-end"
      onClick={handleCloseSheet}
    >
      <div className="relative w-full bg-white rounded-t-3xl py-14 px-12 flex flex-col gap-12">
        <div className="w-full flex flex-col gap-6 items-center">
          <div
            onClick={handleSighOut}
            className="w-full flex items-center gap-2 cursor-pointer"
          >
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
