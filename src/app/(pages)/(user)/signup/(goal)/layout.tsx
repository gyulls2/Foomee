'use client';

import { BackArrowIcon } from '@/components/icons/IconComponents';
import { fetchUser } from '@/data/fetch/userFetch';
import { UserData } from '@/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const PageContext = React.createContext<UserData | null>(null);

export default function GoalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm();
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<UserData | null>(null);

  // edit mode일때, user 정보 가져오기
  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        try {
          const userData = await fetchUser(
            session.user._id,
            session.accessToken,
          );
          if (!userData) {
            throw new Error('Failed to fetch user data');
          }
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [session]);

  return (
    <div className="flex flex-col min-h-screen h-screen bg-white">
      <header className="w-full h-12 px-8 py-4">
        <button onClick={() => router.back()}>
          <BackArrowIcon />
        </button>
      </header>
      <main className="flex flex-col flex-grow pt-4 pb-10 px-10">
        <PageContext.Provider value={user}>
          <FormProvider {...methods}>{children}</FormProvider>
        </PageContext.Provider>
      </main>
    </div>
  );
}
