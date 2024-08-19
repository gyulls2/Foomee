'use client';

import Image from 'next/image';
import StepIndicator from '@/components/StepIndicator';
import { useFormContext } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { patchUser } from '@/data/actions/userAction';
import { useRouter } from 'next/navigation';
import { UserData } from '@/types';

const Step5Page = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useFormContext();
  const selected = watch('character');
  const session = useSession();
  const router = useRouter();

  const onSubmit = async (data: Pick<UserData, 'extra'>) => {
    const _id = session?.data?.user._id;
    if (!_id) return;
    const res = await patchUser(_id, data);
    if (res) router.push('/home');
  };

  return (
    <div className="flex flex-col gap-10  min-h-full h-full">
      <StepIndicator current="5" />
      <h2 className="font-semibold leading-9 text-2xl text-gray-900">
        목표 달성을 도울
        <br />
        매니저를 선택해주세요
      </h2>
      <div className="flex flex-col items-start mt-10">
        <div className="flex justify-center space-x-10 self-center">
          <label className="flex flex-col items-center cursor-pointer">
            <input
              type="radio"
              value="orange"
              className="hidden"
              {...register('character', { required: true })}
            />
            <div
              className={`rounded-full flex items-center justify-center ${selected === 'orange' ? '' : 'opacity-50 filter'}`}
            >
              <Image
                src="/images/profile_orange.png"
                alt="탱귤 매니저"
                width={86}
                height={86}
              />
            </div>
            <span className="text-gray-400 mt-4 font-semibold">탱귤</span>
          </label>

          <label className="flex flex-col items-center cursor-pointer">
            <input
              type="radio"
              value="peach"
              className="hidden"
              {...register('character', { required: true })}
            />
            <div
              className={`rounded-full flex items-center justify-center ${selected === 'peach' ? '' : 'opacity-50 filter'}`}
            >
              <Image
                src="/images/profile_peach.png"
                alt="숭숭 매니저"
                width={86}
                height={86}
              />
            </div>
            <span className="text-gray-400 mt-4 font-semibold">숭숭</span>
          </label>

          <label className="flex flex-col items-center cursor-pointer">
            <input
              type="radio"
              value="cabbage"
              className="hidden"
              {...register('character', { required: true })}
            />
            <div
              className={`rounded-full flex items-center justify-center ${selected === 'cabbage' ? '' : 'opacity-50 filter'}`}
            >
              <Image
                src="/images/profile_cabbage.png"
                alt="추추 매니저"
                width={86}
                height={86}
              />
            </div>
            <span className="text-gray-400 mt-4 font-semibold">추추</span>
          </label>
        </div>
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
          className="rounded-full w-full h-14 bg-[#ffb800] disabled:opacity-50"
        >
          <p className="text-center font-semibold leading-5 text-lg text-neutral-100">
            시작하기
          </p>
        </button>
      </div>
    </div>
  );
};

export default Step5Page;
