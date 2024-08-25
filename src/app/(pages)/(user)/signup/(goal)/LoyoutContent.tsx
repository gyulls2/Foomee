'use client';

import { BackArrowIcon } from '@/components/icons/IconComponents';
import { UserData } from '@/types';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const PageContext = React.createContext<UserData | null>(null);

const LayoutContent = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserData | undefined;
}) => {
  const methods = useForm();
  const router = useRouter();

  return (
    <>
      <header className="w-full h-12 px-8 py-4">
        <button onClick={() => router.back()}>
          <BackArrowIcon />
        </button>
      </header>
      <main className="flex flex-col flex-grow pt-4 pb-10 px-10">
        <PageContext.Provider value={user || null}>
          <FormProvider {...methods}>{children}</FormProvider>
        </PageContext.Provider>
      </main>
    </>
  );
};

export default LayoutContent;
