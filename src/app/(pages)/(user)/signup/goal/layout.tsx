import { BackArrowIcon } from '@/components/icons/IconComponents';
import React from 'react';

export default function GoalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen h-screen bg-white">
      <header className="w-full h-12 px-8 py-4">
        <button>
          <BackArrowIcon />
        </button>
      </header>
      <main className="flex flex-col flex-grow pt-4 pb-20 px-10">
        {children}
      </main>
    </div>
  );
}
