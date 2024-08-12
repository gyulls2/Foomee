import { CloseIcon } from '@/components/icons/IconComponents';
import Link from 'next/link';
import CalendarSeciont from './CalendarSeciont';

const CalendarPage = () => {
  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      <header className="relative w-full h-12 px-8 py-8 flex justify-end">
        <Link href="/home">
          <CloseIcon />
        </Link>
      </header>
      <section className="py-2.5 px-8 flex flex-col gap-8 relative w-full h-full min-h-without-header">
        <CalendarSeciont />
        <div className="mt-auto">
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
