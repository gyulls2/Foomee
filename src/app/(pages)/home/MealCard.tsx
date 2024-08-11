'use client';

import { AddIcon } from '@/components/icons/IconComponents';
import { fetchPosts } from '@/data/fetch/postFetch';
import useNutritionStore from '@/zustand/nutritionStore';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Meal {
  name: string;
  type: string;
  icon: string;
  width: number;
  height: number;
}

export interface Food {
  foodNm: string;
  enerc: string;
  inputQua: string;
  prot: string;
  fatce: string;
  chocdf: string;
  foodSize: string;
}

export interface Total {
  enerc: number;
  prot: number;
  fatce: number;
  chocdf: number;
}

const MealCard = ({ meal }: { meal: Meal }) => {
  const { name, type, icon, width, height } = meal;
  const { data: session } = useSession();
  const [total, setTotal] = useState<Total | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAdded, setHasAdded] = useState(false); // 값이 이미 추가되었는지

  const { addNutrition } = useNutritionStore();

  const getDay = (day = 0) => {
    return moment().add(day, 'days').format('YYYY.MM.DD');
  };

  // foodList 조회
  useEffect(() => {
    let isMounted = true;

    const fetchFoodList = async () => {
      const foodList = await fetchPosts(type, undefined, getDay(0));

      if (foodList && isMounted) {
        // 각 영양소의 총합을 계산
        const totals = foodList.reduce(
          (acc, cur) => {
            if (cur.extra) {
              acc.enerc += parseInt(cur.extra.enerc || '0');
              acc.prot += parseInt(cur.extra.prot || '0');
              acc.fatce += parseInt(cur.extra.fatce || '0');
              acc.chocdf += parseInt(cur.extra.chocdf || '0');
            }
            return acc;
          },
          { enerc: 0, prot: 0, fatce: 0, chocdf: 0 },
        );

        setTotal({
          enerc: totals.enerc,
          prot: totals.prot,
          fatce: totals.fatce,
          chocdf: totals.chocdf,
        });
        setIsLoaded(true);
      }
    };
    fetchFoodList();

    return () => {
      isMounted = false; // 컴포넌트가 언마운트되면 상태를 false로 설정
    };
  }, [session, type]);

  // zustand total 칼로리, 탄단지 업데이트
  useEffect(() => {
    if (total && isLoaded && !hasAdded) {
      addNutrition(total);
      setHasAdded(true);
    }
  }, [total, isLoaded, addNutrition]);

  const bgColorClass =
    {
      breakfast: 'bg-point-light-green',
      lunch: 'bg-point-orange',
      dinner: 'bg-point-green',
      snack: 'bg-point-pink',
    }[type] || 'bg-white';

  return (
    <div className="relative h-44">
      <Link href={`/meals/${type}/${getDay(0)}`}>
        <div
          className={`${bgColorClass} rounded-[20px] px-6 py-6 flex flex-col justify-between relative w-full h-full`}
        >
          <Image src={icon} alt={name} width={width} height={height} />
          <div>
            <h3 className="font-semibold text-white">{name}</h3>
            <p className="text-white">{total?.enerc || 0} kcal</p>
          </div>
        </div>
      </Link>
      <Link href="/search" className="absolute top-6 right-6">
        <AddIcon width="36" height="36" fill="#ffffff" />
      </Link>
    </div>
  );
};

export default MealCard;
