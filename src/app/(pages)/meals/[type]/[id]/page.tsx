'use client';

import { Total } from '@/app/(pages)/home/MealCard';
import {
  AddIcon,
  CloseIcon,
  ImageIcon,
} from '@/components/icons/IconComponents';
import { fetchPosts } from '@/data/fetch/postFetch';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import { Post } from '@/types';

const calculateWidth = (total: Total) => {
  const { prot, fatce, chocdf } = total;
  const value = 100 / (chocdf + prot + fatce);
  return { chocdf: chocdf * value, prot: prot * value, fatce: fatce * value };
};

type MealKey = 'breakfast' | 'lunch' | 'dinner' | 'snack';

const MealList = {
  breakfast: {
    name: '아침',
    icon: '/images/asset_tomato.png',
  },
  lunch: {
    name: '점심',
    icon: '/images/asset_lime.png',
  },
  dinner: {
    name: '저녁',
    icon: '/images/asset_egg.png',
  },
  snack: {
    name: '간식',
    icon: '/images/asset_avocado.png',
  },
};

const MealsPage = ({ params }: { params: { type: MealKey; id: string } }) => {
  const { type, id } = params;
  const [foodList, setFoodList] = useState<Post[] | null>(null);
  const [total, setTotal] = useState<Total | null>(null);
  const [width, setWidth] = useState({ chocdf: 0, prot: 0, fatce: 0 });
  const [refresh, setRefresh] = useState(false);

  // foodList 조회
  useEffect(() => {
    const fetchFoodList = async () => {
      const list = await fetchPosts(type, undefined, id);

      if (list) {
        setFoodList(list);

        // 각 영양소의 총합을 계산
        const totals = list.reduce(
          (acc, cur) => {
            acc.enerc += parseInt(cur.extra?.enerc || '0');
            acc.prot += parseInt(cur.extra?.prot || '0');
            acc.fatce += parseInt(cur.extra?.fatce || '0');
            acc.chocdf += parseInt(cur.extra?.chocdf || '0');
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

        setRefresh(false);
      }
    };
    fetchFoodList();
  }, [id, type, refresh]);

  // 탄단지 비율 계산
  useEffect(() => {
    if (total) {
      setWidth(calculateWidth(total));
    } else if (total === null) {
      setWidth({ chocdf: 33.33, prot: 33.33, fatce: 33.33 });
    }
  }, [total]);

  return (
    <main className="w-full mx-auto min-h-screen h-full bg-[#FFECBA]">
      <header className="relative w-full px-8 py-4">
        <Link href="/home" className="absolute right-6">
          <span className="sr-only">닫기</span>
          <CloseIcon />
        </Link>
      </header>
      <section className="flex flex-col h-full min-h-without-header">
        <div className="text-center px-8 py-16">
          <div className="flex justify-center mb-4">
            <div className="relative w-36 h-36 rounded-full bg-[#FFB800] flex flex-col justify-center items-center">
              <Image
                src={MealList[type].icon}
                alt={type}
                width={80}
                height={80}
              />
              <div className="absolute bottom-0.5 right-0.5 bg-white p-1.5 rounded-full">
                <ImageIcon />
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {total?.enerc || 0} kcal
          </div>
          <p className="text-gray-600 mb-10">먹었어요</p>
          <div className="w-[85%] h-2 bg-white rounded-full mx-auto flex flex-nowrap">
            <div
              className="h-full bg-main-primary-yellow rounded-l-full"
              style={{ width: `${width.chocdf || 0}%` }}
            ></div>
            <div
              className="h-full bg-point-light-green"
              style={{ width: `${width.prot || 0}%` }}
            ></div>
            <div
              className="h-full bg-point-pink rounded-r-full"
              style={{ width: `${width.fatce || 0}%` }}
            ></div>
          </div>
          <div className="w-[85%] flex justify-around mt-6 mx-auto">
            <div className="text-center">
              <p className="text-sm text-gray-600">탄수화물</p>
              <p className="text-lg font-semibold">{total?.chocdf || 0}g</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">단백질</p>
              <p className="text-lg font-semibold">{total?.prot || 0}g</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">지방</p>
              <p className="text-lg font-semibold">{total?.fatce || 0}g</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 flex-grow mb-16">
          <div className="mb-4">
            <h2 className="text-xl">
              {MealList[type].name} 메뉴{' '}
              <span className="text-[#FF7A00]">{foodList?.length || 0}</span>
            </h2>
            {foodList?.map((item, idx) => (
              <FoodCard key={idx} item={item} setRefresh={setRefresh} />
            ))}
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-white p-8 mx-auto max-w-[475px]">
          <div className="flex gap-4 w-full">
            <Link
              href={`/search/${type}`}
              className="w-4/12 rounded-full h-12 border-2 border-[#ffb800] text-center font-semibold leading-7 text-lg text-[#ffb800] flex justify-center items-center gap-1 pr-2"
            >
              <AddIcon fill="#ffb800" />
              <p>추가</p>
            </Link>
            <Link
              href="/home"
              className="flex-grow rounded-full h-12 bg-[#ffb800] text-center font-semibold leading-7 text-lg text-neutral-100 flex justify-center items-center"
            >
              <p>수정 완료</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MealsPage;
