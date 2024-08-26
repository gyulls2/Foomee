'use client';

import AddFoodSheet from '@/components/layout/AddFoodSheet';
import { SearchIcon, MealIcon } from '@/components/icons/IconComponents';
import BottomNav from '@/components/layout/BottomNav';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import AddFoodCard from './AddFoodCard';
import { FoodData } from '@/types';
import useDebounce from '@/hooks/useDebounce';
import { foodApiFetch } from '@/data/fetch/foodApiFetch';

const SearchPage = () => {
  const { register, watch } = useForm();
  const [foodList, setFoodList] = useState<FoodData[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const [foodData, setFoodData] = useState<FoodData | null>(null);
  const [text, setText] = useState('오늘 먹은 음식을 검색해보세요');

  const inputValue = watch('foodName');

  const debouncedValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (debouncedValue) {
      const fetchFoodData = async (foodName: string) => {
        const data = await foodApiFetch(foodName);
        if (data && !data.items) {
          setText('검색 결과가 없습니다 😥\n직접 입력 기능을 개발 중이에요!');
        }
        if (data && data.items) {
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
            <h2 className="whitespace-pre-line text-center">{text}</h2>
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
