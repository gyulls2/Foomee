'use client';

import moment from 'moment';
import { useEffect, useState } from 'react';
import Calendar, { OnArgs } from 'react-calendar';
import './calendar.css';
import { fetchPosts } from '@/data/fetch/postFetch';
import { useRouter } from 'next/navigation';
import useDateStore from '@/zustand/dateStore';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type PostType = {
  content: string | undefined;
  title: string;
};

const CalendarSection = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [isDiet, setIsDiet] = useState(true);
  const [activeStartDate, setActiveStartDate] = useState<ValuePiece>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1); // 현재 달의 첫째 날
  });
  const router = useRouter();
  const setDate = useDateStore(state => state.setDate);

  // 선택된 달 구하기
  const handleActiveStartDateChange = ({ activeStartDate }: OnArgs) => {
    setActiveStartDate(activeStartDate);
  };

  // 체중 데이터 불러오기
  const [weightData, setWeightData] = useState<PostType[]>([]);

  // 섭취 칼로리 데이터 불러오기
  const [calorieData, setCalorieData] = useState<PostType[]>([]);

  useEffect(() => {
    if (!isDiet) {
      const fetchWeight = async () => {
        const keyword = moment(activeStartDate).format('YYYY.MM');
        const response = await fetchPosts('weight', undefined, keyword);
        if (response) {
          const weightArr = response.map(item => ({
            title: item.title,
            content: item.content,
          }));
          setWeightData(weightArr);
        }
      };
      fetchWeight();
    } else {
      const fetchCalorie = async () => {
        const keyword = moment(activeStartDate).format('YYYY.MM');
        const response = await fetchPosts('nutri', undefined, keyword);
        if (response) {
          const calorieArr = response.map(item => ({
            title: item.title,
            content: item.extra?.enerc,
          }));
          setCalorieData(calorieArr);
        }
      };
      fetchCalorie();
    }
  }, [isDiet, activeStartDate]);

  // 각 날짜 타일에 컨텐츠 추가
  const addContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;

    // date가 post의 title과 일치하면 해당 content를 표시
    const match = (isDiet ? calorieData : weightData).find(
      item => item.title === moment(date).format('YYYY.MM.DD') && item.content,
    );

    return (
      <div>
        {match ? (
          <span className="text-gray-500 font-semibold">
            {isDiet ? `+${match.content}` : `${match.content}kg`}
          </span>
        ) : (
          <span className="text-gray-500 font-semibold">-</span>
        )}
      </div>
    );
  };

  // 기록이 있을 경우 배경색 변경
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const match = (isDiet ? calorieData : weightData).find(
        item =>
          item.title === moment(date).format('YYYY.MM.DD') && item.content,
      );

      if (match) {
        return isDiet ? 'diet-recorded' : 'weight-recorded';
      }
    }
    return '';
  };

  // 오늘로 이동
  const handleMoveToday = () => {
    setDate(new Date());
    router.push('/home');
  };

  // 선택한 날짜로 이동
  const handleMoveSelected = () => {
    if (value instanceof Date) {
      setDate(value);
    }
    router.push('/home');
  };

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
          onActiveStartDateChange={handleActiveStartDateChange}
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
          tileContent={addContent}
          tileClassName={tileClassName}
        />
      </div>

      <div className="mt-auto flex gap-4">
        <button
          className="rounded-full w-6/12 h-14 border-2 border-main-primary-yellow"
          onClick={handleMoveToday}
        >
          <p className="text-center font-semibold leading-5 text-lg text-main-primary-yellow">
            오늘로 이동
          </p>
        </button>
        <button
          className="rounded-full w-full h-14 bg-[#ffb800]"
          onClick={handleMoveSelected}
        >
          <p className="text-center font-semibold leading-5 text-lg text-neutral-100">
            선택한 날짜로 이동
          </p>
        </button>
      </div>
    </div>
  );
};

export default CalendarSection;
