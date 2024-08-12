'use client';

import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarSeciont = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex gap-2 absolute top-16">
        <button className="bg-main-primary-yellow py-1 px-2 rounded-full flex items-center">
          <div className="rounded-full w-3 h-3 bg-point-green mr-2"></div>
          <p className="text-white text-sm">먹었어요</p>
        </button>
        <button className="border-2 border-main-primary-yellow py-1 px-2 rounded-full flex items-center">
          <div className="rounded-full w-3 h-3 bg-point-pink mr-2"></div>
          <p className="text-sm">몸무게</p>
        </button>
      </div>

      <div className="mt-2">
        <Calendar
          onChange={onChange}
          value={value}
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
          formatDay={(locale, date) => moment(date).format('D')}
          formatYear={(locale, date) => moment(date).format('YYYY')}
          formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
          minDetail="year"
          calendarType="gregory"
        />
      </div>
    </div>
  );
};

export default CalendarSeciont;
