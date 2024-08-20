'use client';

import Image from 'next/image';
import { SmileyIcon } from '@/components/icons/IconComponents';
import { fetchPosts } from '@/data/fetch/postFetch';
import { useEffect, useState } from 'react';
import { Post, UserData } from '@/types';
import WeightInputSheet from '@/components/layout/WeightInputSheet';
import useDateStore from '@/zustand/dateStore';

const WeightForm = ({ user }: { user: UserData | undefined }) => {
  const [data, setData] = useState<Post | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false); // 데이터를 다시 불러오기 위한 상태
  const [diff, setDiff] = useState('-0');
  const [bmi, setBmi] = useState(0);
  const { date, getDate } = useDateStore();

  // 오늘 체중 조회
  useEffect(() => {
    const fetchWeight = async () => {
      const res = await fetchPosts('weight', undefined, getDate());
      if (res.length === 0) {
        setData(null);
        setIsEdit(false);
      } else {
        setData(res[0]);
        setIsEdit(true);
      }
    };
    fetchWeight();
  }, [refresh, date, getDate]);

  // 체중 변화 계산
  useEffect(() => {
    const start = user?.extra?.starting_weight || 0;
    const current = parseFloat(data?.content || '0');
    if (start === 0 || current === 0) {
      setDiff('0');
      return;
    }
    const num = ((start - current) * -1).toFixed(1);
    if (start < current) {
      setDiff(`+${num}`);
    } else {
      setDiff(num);
    }
  }, [data, user]);

  // BMI 계산
  useEffect(() => {
    const weight = parseFloat(data?.content || '0');
    const height = user?.extra?.height || 0;
    if (weight === 0 || height === 0) {
      setBmi(0);
      return;
    }
    // 체중(kg) / [신장(m)]2
    const bmi = (weight / (height / 100) ** 2).toFixed(1);
    setBmi(parseFloat(bmi));
  }, [data, user]);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
    setRefresh(false);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      {isSheetOpen && (
        <WeightInputSheet
          close={handleCloseSheet}
          isEdit={isEdit}
          post={data}
          setRefresh={setRefresh}
        />
      )}
      <div className="flex flex-col bg-[#FFF9EA] p-8 w-full h-full min-h-screen max-h-[1240px] overflow-hidden">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">나의 변화</h2>
        </div>
        <div className="flex flex-col flex-grow justify-center items-center">
          <p className="mt-4 text-gray-600">이전보다 {diff} kg</p>
          <h3 className="mt-2 text-6xl font-bold text-orange-600">
            {data?.content || '00.0'} kg
          </h3>
          <div className="mt-14">
            <Image
              src={`/images/character_${user?.extra?.character || 'orange'}.png`}
              alt="매니저 캐릭터"
              width={230}
              height={269}
            />
          </div>
          <button
            className="mt-10 rounded-full px-14 py-2 bg-[#ffb800] text-center font-semibold leading-7 text-lg text-neutral-100"
            onClick={handleOpenSheet}
          >
            {isEdit ? '수정하기' : '기록하기'}
          </button>
          <div className="mt-4 flex justify-center gap-1 pb-16">
            <SmileyIcon width="24" height="24" />
            {/* TODO : bmi 지수 그래프로 시각화 */}
            <p className="text-gray-600 pt-0.5">나의 BMI : {bmi}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeightForm;
