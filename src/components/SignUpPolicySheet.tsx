import React from 'react';
import { CheckCircleIcon, ChevronRight } from './icons/IconComponents';

const SignUpPolicySheet: React.FC = () => {
  return (
    <div className="overflow-hidden absolute w-full min-h-screen h-full bg-black/70 z-10 flex flex-col justify-end">
      <div className="relative w-full bg-white rounded-t-3xl py-14 px-12 flex flex-col gap-12">
        <h2 className="text-center leading-5 text-xl text-gray-900">
          서비스 이용 필수 동의
        </h2>
        <div className="w-full flex flex-col gap-6 items-center">
          <div className="w-full flex items-center gap-2">
            <button>
              <CheckCircleIcon checked={true} />
            </button>
            <p className="leading-7 text-base text-gray-900">
              이용 약관에 동의
            </p>
            <button className="ml-auto">
              <ChevronRight />
            </button>
          </div>
          <div className="w-full flex items-center gap-2">
            <button>
              <CheckCircleIcon />
            </button>
            <p className="leading-7 text-base text-gray-900">
              이용 약관에 동의
            </p>
            <button className="ml-auto">
              <ChevronRight />
            </button>
          </div>
          <div className="w-full flex items-center gap-2">
            <button>
              <CheckCircleIcon />
            </button>
            <p className="leading-7 text-base text-gray-900">
              이용 약관에 동의
            </p>
            <button className="ml-auto">
              <ChevronRight />
            </button>
          </div>
          <div className="w-full flex items-center gap-2">
            <button>
              <CheckCircleIcon />
            </button>
            <p className="leading-7 text-base text-gray-900">
              이용 약관에 동의
            </p>
            <button className="ml-auto">
              <ChevronRight />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="rounded-full w-full h-12 bg-[#ffb800] text-center font-semibold leading-7 text-lg text-neutral-100"
        >
          네, 모두 동의해요
        </button>
      </div>
    </div>
  );
};

export default SignUpPolicySheet;
