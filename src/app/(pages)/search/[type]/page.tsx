'use client';

import {
  BackArrowIcon,
  MealIcon,
  SearchIcon,
} from '@/components/icons/IconComponents';
import AddFoodSheet from '@/components/layout/AddFoodSheet';
import useDebounce from '@/hooks/useDebounce';
import { FoodData, Post } from '@/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AddFoodCard from '../AddFoodCard';
import { fetchPosts } from '@/data/fetch/postFetch';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { foodApiFetch } from '@/data/fetch/foodApiFetch';

const SearchTypePage = ({ params }: { params: { type: string } }) => {
  const { register, watch } = useForm();
  const [foodList, setFoodList] = useState<FoodData[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const [foodData, setFoodData] = useState<FoodData | null>(null);

  const [dietList, setDietList] = useState<Post[]>([]);
  const router = useRouter();
  const { type } = params;

  const inputValue = watch('foodName');

  const debouncedValue = useDebounce(inputValue, 1000);

  const getDay = (day = 0) => {
    return moment().add(day, 'days').format('YYYY.MM.DD');
  };

  // 입력된 식단 게시물 조회
  useEffect(() => {
    const fetchDietList = async () => {
      const data = await fetchPosts(type, undefined, getDay(0));
      if (data) {
        setDietList(data);
      }
    };
    fetchDietList();
  }, [type]);

  useEffect(() => {
    if (debouncedValue) {
      const fetchFoodData = async (foodName: string) => {
        const data = await foodApiFetch(foodName);
        if (data) {
          setFoodList(data.items);
        }
      };
      fetchFoodData(debouncedValue);
    }
  }, [debouncedValue]);

  const handleMoveToList = () => {
    router.push(`/meals/${type}/${getDay(0)}`);
  };

  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      {isOpened && foodData && (
        <AddFoodSheet
          type={type}
          foodData={foodData}
          setIsOpened={setIsOpened}
        />
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
        <button
          className={`flex justify-center items-center bg-main-primary-yellow rounded-full h-10 w-10 disabled:bg-[#F5F5F5] disabled:cursor-not-allowed`}
          disabled={!dietList?.length}
          onClick={handleMoveToList}
        >
          <span
            className={`font-bold ${dietList?.length ? 'text-white' : 'text-gray-400'}`}
          >
            {dietList?.length || '0'}
          </span>
        </button>
      </header>
      <section className="px-8 flex flex-col gap-8 relative w-full h-full min-h-without-header bg-[#FFFBF1] items-center pt-4 pb-20">
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
    </main>
  );
};

export default SearchTypePage;
