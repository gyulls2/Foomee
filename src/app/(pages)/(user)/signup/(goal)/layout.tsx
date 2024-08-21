'use client';

import { BackArrowIcon } from '@/components/icons/IconComponents';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

export default function GoalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen h-screen bg-white">
      <header className="w-full h-12 px-8 py-4">
        <button onClick={() => router.back()}>
          <BackArrowIcon />
        </button>
      </header>
      <main className="flex flex-col flex-grow pt-4 pb-10 px-10">
        <FormProvider {...methods}>{children}</FormProvider>
      </main>
    </div>
  );
}
