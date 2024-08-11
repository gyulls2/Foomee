'use client';

import AddFoodSheet from '@/components/layout/AddFoodSheet';
import { SearchIcon, MealIcon } from '@/components/icons/IconComponents';
import BottomNav from '@/components/layout/BottomNav';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import AddFoodCard from './AddFoodCard';
import { FoodData, FoodDataResponse } from '@/types';
import useDebounce from '@/hooks/useDebounce';

export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const fetchData = async (
  foodName: string,
): Promise<FoodDataResponse | null> => {
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
    return null;
  }
};

const SearchPage = () => {
  const { register, watch } = useForm();
  const [foodList, setFoodList] = useState<FoodData[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const [foodData, setFoodData] = useState<FoodData | null>(null);

  const inputValue = watch('foodName');

  const debouncedValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (debouncedValue) {
      const fetchFoodData = async (foodName: string) => {
        const data = await fetchData(foodName);
        if (data) {
          setFoodList(data.items);
        }
      };
      fetchFoodData(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      {isOpened && foodData && (
        <AddFoodSheet foodData={foodData} setIsOpened={setIsOpened} />
      )}

      <header className="flex text-center relative w-full px-4 py-4 gap-3 items-center">
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
