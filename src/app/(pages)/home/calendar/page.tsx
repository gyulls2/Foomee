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

        <div className="mt-auto flex gap-4">
          <button className="rounded-full w-6/12 h-14 border-2 border-main-primary-yellow">
            <p className="text-center font-semibold leading-5 text-lg text-main-primary-yellow">
              오늘로 이동
            </p>
          </button>
          <button className="rounded-full w-full h-14 bg-[#ffb800]">
            <p className="text-center font-semibold leading-5 text-lg text-neutral-100">
              선택한 날짜로 이동
            </p>
          </button>
        </div>
      </section>
    </main>
  );
};

export default CalendarPage;
