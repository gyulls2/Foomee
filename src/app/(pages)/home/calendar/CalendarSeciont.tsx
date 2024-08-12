'use client';

import { DropDownIcon } from '@/components/icons/IconComponents';
import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarSeciont = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold leading-9 text-2xl text-gray-900">
          2024.07
        </h1>
        <DropDownIcon width="32" height="32" />
      </div>
      <div className="flex gap-2">
        <button className="bg-main-primary-yellow py-2 px-3 rounded-full flex items-center">
          <div className="rounded-full w-4 h-4 bg-point-green mr-2"></div>
          <p className="text-white text-sm">먹었어요</p>
        </button>
        <button className="border-2 border-main-primary-yellow py-2 px-3 rounded-full flex items-center">
          <div className="rounded-full w-4 h-4 bg-point-pink mr-2"></div>
          <p className="text-sm">몸무게</p>
        </button>
      </div>

      <div>
        <Calendar
          onChange={onChange}
          value={value}
          formatDay={(locale, date) => moment(date).format('D')}
        />
      </div>
    </div>
  );
};

export default CalendarSeciont;
