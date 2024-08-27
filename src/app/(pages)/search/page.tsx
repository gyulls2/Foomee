'use client';

import AddFoodSheet from '@/components/layout/AddFoodSheet';
import { SearchIcon, MealIcon } from '@/components/icons/IconComponents';
import BottomNav from '@/components/layout/BottomNav';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useRef, useState } from 'react';
import AddFoodCard from './AddFoodCard';
import { FoodData } from '@/types';
import useDebounce from '@/hooks/useDebounce';
import { foodApiFetch } from '@/data/fetch/foodApiFetch';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { TargetArea } from '@/components/Spinner';

const SearchPage = () => {
  const { register, watch } = useForm();
  const [foodList, setFoodList] = useState<FoodData[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const [foodData, setFoodData] = useState<FoodData | null>(null);
  const [text, setText] = useState('오늘 먹은 음식을 검색해보세요');

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const inputValue = watch('foodName');

  const debouncedValue = useDebounce(inputValue, 1000);
  const prevDebouncedValue = useRef('');

  const fetchFoodData = useCallback(async (foodName: string, page: number) => {
    setIsLoading(true); // 데이터 요청 전 로딩 상태 true로 설정

    try {
      const data = await foodApiFetch(foodName, page);

      if (data && !data.items) {
        setText('검색 결과가 없습니다 😥\n직접 입력 기능을 개발 중이에요!');
        setHasMore(false);
        setIsLoading(false); // 데이터 요청 완료 후 로딩 상태 false로 설정
        return;
      }

      if (data && data.items) {
        const totalPages = Math.ceil(data.totalCount / data.numOfRows);
        setFoodList(prev => [...prev, ...data.items]);

        // 두 조건을 모두 확인하여 hasMore를 설정
        setHasMore(page < totalPages && data.items.length > 0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // 데이터 요청 완료 후 로딩 상태 false로 설정
    }
  }, []);

  useEffect(() => {
    const initialLoad = async () => {
      if (debouncedValue) {
        setFoodList([]);
        setPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 스크롤을 맨 위로 이동
        await fetchFoodData(debouncedValue, 1); // 첫 번째 페이지부터 새로 데이터 로드
        prevDebouncedValue.current = debouncedValue; // prevDebouncedValue 업데이트
      }
    };

    initialLoad();
  }, [debouncedValue]);

  useEffect(() => {
    if (
      debouncedValue &&
      page > 1 &&
      debouncedValue === prevDebouncedValue.current
    ) {
      fetchFoodData(debouncedValue, page);
    }
  }, [page, debouncedValue]);

  // 무한 스크롤로 페이지 증가 시
  const loadMore = () => {
    if (hasMore && !isLoading) {
      setPage(prev => prev + 1);
    }
  };

  const { lastElementRef } = useInfiniteScroll({
    hasMore,
    loadMore,
  });

  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      {isOpened && foodData && (
        <AddFoodSheet foodData={foodData} setIsOpened={setIsOpened} />
      )}

      <header className="flex text-center w-full px-4 py-4 gap-3 items-center fixed top-0 left-1/2 z-10 bg-white max-w-[475px] translate-x-[-50%]">
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
      <section className="px-8 flex flex-col gap-8 relative w-full h-full min-h-without-tab bg-[#FFFBF1] items-center pt-24 pb-20">
        {!foodList.length && !isLoading && (
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
            <div ref={lastElementRef} className="h-[5px]"></div>
          </div>
        )}
        {isLoading && <TargetArea />}
      </section>

      <BottomNav />
    </main>
  );
};

export default SearchPage;
