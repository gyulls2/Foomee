'use client';

import { CloseIcon } from '@/components/icons/IconComponents';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CloseButton = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.alert('개발중인 기능입니다!');
    }
  }, []);

  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return (
    <button className="text-gray-500" onClick={handleClose}>
      <span className="sr-only">닫기</span>
      <CloseIcon />
    </button>
  );
};

export default CloseButton;
