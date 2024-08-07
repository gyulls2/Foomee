import Image from 'next/image';
import { SmileyIcon } from '@/components/icons/IconComponents';
import useUserStore from '@/zustand/userStore';
import { fetchPosts } from '@/data/fetch/postFetch';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getSession } from '@/data/actions/authAction';

const WeightForm = async () => {
  const session = await getSession();

  const getDay = (day = 0) => {
    return moment().add(day, 'days').format('YYYY.MM.DD');
  };

  const data = await fetchPosts('weight', undefined, getDay());

  return (
    <div className="flex flex-col bg-[#FFF9EA] p-8 w-full h-full min-h-without-header-tab max-h-[1240px] overflow-hidden">
      <div className="flex items-center space-x-2">
        {/* TODO:아이콘 추가 */}
        <h2 className="text-lg font-semibold">나의 변화</h2>
      </div>
      <div className="flex flex-col flex-grow justify-center items-center">
        <p className="mt-4 text-gray-600">이전보다 -0 kg</p>
        <h3 className="mt-2 text-6xl font-bold text-orange-600">
          {data[0]?.extra?.weight || '00.0'} kg
        </h3>
        <div className="mt-14">
          <Image
            src={`/images/character_${data[0]?.extra?.character || 'orange'}.png`}
            alt="매니저 캐릭터"
            width={230}
            height={269}
          />
        </div>
        <button
          type="submit"
          className="mt-10 rounded-full px-14 py-2 bg-[#ffb800] text-center font-semibold leading-7 text-lg text-neutral-100"
        >
          기록하기
        </button>
        <div className="mt-4 flex justify-center gap-1 pb-16">
          <SmileyIcon width="24" height="24" />
          <p className="text-gray-600 pt-0.5">나의 BMI : 26.8</p>
        </div>
      </div>
    </div>
  );
};

export default WeightForm;
