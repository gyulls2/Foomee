'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import ChartSection from './ChartSection';
import { useEffect, useState } from 'react';
import ToggleButton from '@/components/ToggleButton';
import { fetchPosts } from '@/data/fetch/postFetch';
import { FilterType, TCalorieData, TWeightData } from '@/types';

// 과거 시작 날짜를 생성하는 함수
// 주 단위로 생성
const generatePastDate = (currentStart: Date) => {
  const pastDate = new Date(currentStart);
  pastDate.setDate(pastDate.getDate() - 7);
  return pastDate;
};

const Slider = () => {
  const [filter, setFilter] = useState<FilterType>('daily');
  const [calorieData, setCalorieData] = useState<TCalorieData[]>([]);
  const [weightData, setWeightData] = useState<TWeightData[]>([]);

  // 초기 슬라이드 데이터
  const [slides, setSlides] = useState<Date[]>([
    new Date(),
    generatePastDate(new Date()),
  ]);

  // 슬라이드의 끝에 도달하면, 과거 날짜를 생성하여 슬라이드에 추가
  const handleReachEnd = () => {
    const newSlides = generatePastDate(slides[slides.length - 1]);
    setSlides(prevSlides => [...prevSlides, newSlides]);
  };

  // 칼로리 raw data 조회
  useEffect(() => {
    const fetchCalorieData = async () => {
      const response = await fetchPosts('nutri');
      if (response) {
        const transformedData = response.map(item => ({
          date: item.title,
          enerc: Number(item.extra?.enerc) || 0,
        }));
        setCalorieData(transformedData);
      }
    };
    fetchCalorieData();
  }, []);

  // 체중 raw data 조회
  useEffect(() => {
    const fetchWeightData = async () => {
      const response = await fetchPosts('weight');
      if (response) {
        const transformedData = response.map(item => ({
          x: item.title,
          y: Number(item.content),
          isDerived: false,
        }));
        setWeightData(transformedData);
      }
    };
    fetchWeightData();
  }, []);

  return (
    <div className="w-full h-full">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={false}
        onReachEnd={handleReachEnd}
        dir="rtl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <ChartSection
              startDate={slide}
              filter={filter}
              calorieData={calorieData}
              weightData={weightData}
            />
            {/* 현재 슬라이드의 시작 날짜를 전달 */}
          </SwiperSlide>
        ))}
      </Swiper>

      <ToggleButton filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default Slider;
