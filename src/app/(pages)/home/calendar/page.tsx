import { CloseIcon } from '@/components/icons/IconComponents';

const CalendarPage = () => {
  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      <header className="relative w-full h-12 px-8 py-4 flex justify-end">
        <button>
          <CloseIcon />
        </button>
      </header>
      <h1>캘린더 페이지 입니다.</h1>
    </main>
  );
};

export default CalendarPage;
