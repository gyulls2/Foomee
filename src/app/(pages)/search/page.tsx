'use client';

import AddFoodSheet from '@/components/layout/AddFoodSheet';
import {
  BackArrowIcon,
  SearchIcon,
  MealIcon,
} from '@/components/icons/IconComponents';
import BottomNav from '@/components/layout/BottomNav';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import AddFoodCard from './AddFoodCard';
import { FoodData } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

async function fetchData(foodName: string) {
  console.log('fetchData 실행 : ', foodName);
  try {
    const url =
      'https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo01/getFoodNtrCpntDbInq01';
    const queryParams =
      '?' +
      encodeURIComponent('serviceKey') +
      '=' +
      encodeURIComponent(API_KEY ?? '') +
      '&' +
      encodeURIComponent('pageNo') +
      '=' +
      encodeURIComponent('1') +
      '&' +
      encodeURIComponent('numOfRows') +
      '=' +
      encodeURIComponent('10') +
      '&' +
      encodeURIComponent('type') +
      '=' +
      encodeURIComponent('json') +
      '&' +
      encodeURIComponent('FOOD_NM_KR') +
      '=' +
      encodeURIComponent(foodName);

    const response = await fetch(url + queryParams);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const resJson = await response.json();
    return resJson.body;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const SearchPage = () => {
  const { register, watch } = useForm();
  const [foodList, setFoodList] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [foodData, setFoodData] = useState<FoodData | null>(null);

  const inputValue = watch('foodName');

  const debouncedData = useRef(
    _.debounce(async (foodName: string) => {
      const data = await fetchData(foodName);
      console.log('debouncedData 실행 : ', data);
      if (data) {
        setFoodList(data.items);
      }
    }, 1000),
  ).current;

  useEffect(() => {
    if (inputValue) {
      debouncedData(inputValue);
      console.log('useEffect 실행 : ', foodList);
    }
  }, [inputValue, debouncedData]);

  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      {isOpened && foodData && (
        <AddFoodSheet foodData={foodData} setIsOpened={setIsOpened} />
      )}

      <header className="flex text-center relative w-full px-4 py-4 gap-3 items-center">
        <button>
          <BackArrowIcon />
        </button>
        <div className="relative flex-grow">
          <input
            className="rounded-full w-full h-10 bg-[#F5F5F5] pl-12 pr-4 focus:border-orange-400 focus:outline-none"
            placeholder="무슨 음식을 드셨나요?"
            {...register('foodName', { required: true })}
          />
          <span className="absolute bottom-2 left-4">
            <SearchIcon />
          </span>
        </div>
        <div className="flex justify-center items-center bg-[#F5F5F5] rounded-full h-10 w-10">
          <span className="font-bold text-gray-400">0</span>
        </div>
      </header>
      <section className="px-8 flex flex-col gap-8 relative w-full h-full min-h-without-search-tab bg-[#FFFBF1] items-center pt-4 pb-20">
        {!foodList.length && (
          <div className="flex flex-col gap-4 items-center my-auto">
            <MealIcon height="52" width="52" />
            <h2>오늘 먹은 음식을 검색해보세요</h2>
          </div>
        )}

        {foodList.length > 0 && (
          <div className="w-full">
            {foodList.map((item, idx) => (
              <AddFoodCard
                key={idx}
                item={item}
                setIsOpened={setIsOpened}
                setFoodData={setFoodData}
              />
            ))}
          </div>
        )}
      </section>

      <BottomNav />
    </main>
  );
};

export default SearchPage;
