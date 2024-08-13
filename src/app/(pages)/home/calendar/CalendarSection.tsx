'use client';

import moment from 'moment';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';
import { fetchPost } from '@/data/fetch/postFetch';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarSection = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [isDiet, setIsDiet] = useState(true);

  // 체중 데이터 불러오기
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    const fetchWeight = async () => {
      const response = await fetchPost('weight');
      console.log(response);
      // setWeightData(data);
    };
    fetchWeight();
  }, []);

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex gap-2 absolute top-12">
        <button
          className={`py-1 px-2 rounded-full flex items-center ${isDiet ? 'bg-main-primary-yellow text-white' : 'border-2 border-main-primary-yellow'}`}
          onClick={() => setIsDiet(true)}
        >
          <div className="rounded-full w-3 h-3 bg-point-green mr-2"></div>
          <p className="text-sm">먹었어요</p>
        </button>
        <button
          className={`py-1 px-2 rounded-full flex items-center ${!isDiet ? 'bg-main-primary-yellow text-white' : 'border-2 border-main-primary-yellow'}`}
          onClick={() => setIsDiet(false)}
        >
          <div className="rounded-full w-3 h-3 bg-point-pink mr-2"></div>
          <p className="text-sm">몸무게</p>
        </button>
      </div>

      <div>
        <Calendar
          onChange={onChange}
          value={value}
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
          formatDay={(locale, date) => moment(date).format('D')}
          formatYear={(locale, date) => moment(date).format('YYYY')}
          formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
          formatLongDate={(locale, date) => moment(date).format('YYYY.MM.DD')}
          minDetail="year"
          calendarType="gregory"
          tileContent="100"
        />
      </div>
    </div>
  );
};

export default CalendarSection;
