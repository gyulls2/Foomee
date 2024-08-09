'use client';

import Image from 'next/image';
import { SmileyIcon } from '@/components/icons/IconComponents';
import { fetchPosts } from '@/data/fetch/postFetch';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Post, UserData } from '@/types';
import WeightInputSheet from '@/components/layout/WeightInputSheet';
import { useSession } from 'next-auth/react';
import { fetchUser } from '@/data/fetch/userFetch';

const WeightForm = () => {
  const { data: session } = useSession();
  const [data, setData] = useState<Post | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(!!data);
  const [refresh, setRefresh] = useState(false); // 데이터를 다시 불러오기 위한 상태

  const getDay = (day = 0) => {
    return moment().add(day, 'days').format('YYYY.MM.DD');
  };

  // 오늘 체중 조회
  useEffect(() => {
    console.log('WeightForm useEffect');
    const fetchWeight = async () => {
      const res = await fetchPosts('weight', undefined, getDay());
      console.log('fetchWeight res:', res);

      if (res.length === 0) {
        setData(null);
        return;
      } else {
        setData(res[0]);
      }
    };
    fetchWeight();
  }, [refresh]);

  // 사용자 extra 정보 조회
  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user) {
        try {
          const userData = await fetchUser(
            session.user._id,
            session.accessToken,
          );
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [session]);

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
      <div className="flex flex-col bg-[#FFF9EA] p-8 w-full h-full min-h-without-header-tab max-h-[1240px] overflow-hidden">
        <div className="flex items-center space-x-2">
          {/* TODO:아이콘 추가 */}
          <h2 className="text-lg font-semibold">나의 변화</h2>
        </div>
        <div className="flex flex-col flex-grow justify-center items-center">
          <p className="mt-4 text-gray-600">이전보다 -0 kg</p>
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
            <p className="text-gray-600 pt-0.5">나의 BMI : 26.8</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeightForm;
