import { CloseIcon } from '@/components/icons/IconComponents';
import Link from 'next/link';
import CalendarSection from './CalendarSection';
import { auth } from '@/auth';
import { fetchUser } from '@/data/fetch/userFetch';

const CalendarPage = async () => {
  const session = await auth();

  // 사용자 extra 정보 조회
  const userId = session!.user?.id;
  const accessToken = session!.accessToken;

  if (!userId || !accessToken) {
    throw new Error('Invalid session data');
  }

  const user = await fetchUser(userId, accessToken);

  if (!user) {
    throw new Error('Failed to fetch user data');
  }

  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      <header className="relative w-full h-12 px-4 py-4 flex justify-end">
        <Link href="/home">
          <CloseIcon />
        </Link>
      </header>
      <section className=" px-8 flex flex-col gap-8 relative w-full h-full min-h-without-header">
        <CalendarSection goalCal={user?.extra?.goal_calories || 0} />
      </section>
    </main>
  );
};

export default CalendarPage;
