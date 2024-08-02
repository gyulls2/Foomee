import { BackArrowIcon } from '@/components/icons/IconComponents';
import React from 'react';

export default function GoalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-col justify-center min-h-screen h-full bg-white">
      <header className="relative w-full h-12 px-8 py-4">
        <button>
          <BackArrowIcon />
        </button>
      </header>
      <main className="py-4 px-10">{children}</main>
    </div>
  );
}
