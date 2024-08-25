import { fetchUser } from '@/data/fetch/userFetch';
import { UserData } from '@/types';
import React from 'react';
import LayoutContent from './LoyoutContent';
import { auth } from '@/auth';

export default async function GoalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // 사용자 extra 정보 조회
  const fetchUserData = async (): Promise<UserData | undefined> => {
    if (!session?.user) {
      throw new Error('User is not authenticated');
    }
    try {
      const userData = await fetchUser(session.user._id, session.accessToken);
      if (!userData) {
        throw new Error('Failed to fetch user data');
      }
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const user = await fetchUserData();

  return (
    <div className="flex flex-col min-h-screen h-screen bg-white">
      <LayoutContent user={user}>{children}</LayoutContent>
    </div>
  );
}
