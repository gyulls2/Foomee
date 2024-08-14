'use client';

import {
  ChevronRightIcon,
  DropDownIcon,
} from '@/components/icons/IconComponents';
import useDateStore from '@/zustand/dateStore';
import moment from 'moment';
import Link from 'next/link';
import 'moment/locale/ko';
import { useState } from 'react';

const Header = () => {
  const { date } = useDateStore();
  const getDay = (day: Date) => {
    return moment(day).format('M. D (dd)');
  };
  const [day, setDay] = useState(getDay(date));

  return (
    <header className="flex items-center justify-between w-full px-8 py-4">
      <button aria-label="이전 날짜" className="rotate-180">
        <ChevronRightIcon width="30" height="30" />
      </button>
      <Link
        href="/home/calendar"
        className="pl-4 flex justify-center items-center"
      >
        <h1 className="text-lg font-semibold">{day}</h1>
        <DropDownIcon />
      </Link>
      <button aria-label="다음 날짜">
        <ChevronRightIcon width="30" height="30" />
      </button>
    </header>
  );
};

export default Header;
