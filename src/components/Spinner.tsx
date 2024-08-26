'use client';

import { BeatLoader, FadeLoader } from 'react-spinners';

export function FullScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60">
      <div className="flex flex-col items-center">
        <div className="relative flex justify-center items-center h-[160px]">
          <FadeLoader color="#ff7a00" />
        </div>
        <h3 className="mb-4 text-lg font-medium text-txt">로딩중...</h3>
      </div>
    </div>
  );
}

export function TargetArea({ msg = '로딩중...' }: { msg?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-7 h-[80vh]">
      <BeatLoader color="#ff7a00" />
      <p className="text-sm">{msg}</p>
    </div>
  );
}
