'use client';

import useDateStore from '@/zustand/dateStore';
import MealCard from './MealCard';
import useNutritionStore from '@/zustand/nutritionStore';
import { useEffect, useState } from 'react';
import { fetchPosts } from '@/data/fetch/postFetch';
import postPatch from '@/data/fetch/postPatch';
import postSubmit from '@/data/fetch/postSubmit';

const MealList = [
  {
    name: '아침',
    type: 'breakfast',
    icon: '/images/asset_tomato.png',
    width: 40,
    height: 40,
  },
  {
    name: '점심',
    type: 'lunch',
    icon: '/images/asset_lime.png',
    width: 40,
    height: 40,
  },
  {
    name: '저녁',
    type: 'dinner',
    icon: '/images/asset_egg.png',
    width: 36,
    height: 45,
  },
  {
    name: '간식',
    type: 'snack',
    icon: '/images/asset_avocado.png',
    width: 45,
    height: 66,
  },
];

interface NutritionData {
  type: string;
  title: string;
  extra: {
    enerc: number;
    chocdf: number;
    prot: number;
    fatce: number;
  };
}

interface Total {
  enerc: number;
  prot: number;
  fatce: number;
  chocdf: number;
}

const MealSection = () => {
  const { date, getDate } = useDateStore();
  const { setNutrition, reset } = useNutritionStore();
  const [totals, setTotals] = useState<Total>({
    enerc: 0,
    prot: 0,
    fatce: 0,
    chocdf: 0,
  });

  useEffect(() => {
    setTotals({
      enerc: 0,
      prot: 0,
      fatce: 0,
      chocdf: 0,
    });
    reset();
  }, [date]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchNutri = async () => {
        try {
          const res = await fetchPosts('nutri', undefined, getDate());
          if (res.length === 0) {
            // 생성
            const nutriData: NutritionData = {
              type: 'nutri',
              title: getDate(),
              extra: totals,
            };
            await postSubmit({
              body: JSON.stringify(nutriData),
            });
          } else {
            // 수정
            const id = res[0]._id;
            const nutriData: NutritionData = {
              type: 'nutri',
              title: res[0].title,
              extra: totals,
            };
            await postPatch(id, {
              body: JSON.stringify(nutriData),
            });
          }

          setNutrition(totals);
        } catch (error) {
          console.error('섭취 칼로리 업로드 실패 : ', error);
        }
      };
      fetchNutri();
    }, 1000); // 1초 지연

    return () => clearTimeout(timer);
  }, [totals]);

  return (
    <div className="grid grid-cols-2 gap-6 w-full p-4 pb-10">
      {MealList.map((meal, index) => (
        <MealCard key={index} meal={meal} setTotals={setTotals} />
      ))}
    </div>
  );
};

export default MealSection;
