import { CloseIcon } from '@/components/icons/IconComponents';
import Link from 'next/link';
import CalendarSection from './CalendarSection';
// import { auth } from '@/auth';

const CalendarPage = async () => {
  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      <header className="relative w-full h-12 px-4 py-4 flex justify-end">
        <Link href="/home">
          <CloseIcon />
        </Link>
      </header>
      <section className=" px-8 flex flex-col gap-8 relative w-full h-full min-h-without-header">
        <CalendarSection />
      </section>
    </main>
  );
};

export default CalendarPage;
