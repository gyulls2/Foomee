'use client';

import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { patchUser } from '@/data/actions/userAction';
import { useRouter } from 'next/navigation';
import { UserData } from '@/types';
import { Session } from 'next-auth';
import { useContext, useEffect } from 'react';
import { PageContext } from '../LoyoutContent';

const Step5Form = ({ session }: { session: Session | null }) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useFormContext();
  const selected = watch('character');
  const router = useRouter();
  const user = useContext(PageContext);

  useEffect(() => {
    if (user && user.extra) {
      setValue('character', user.extra.character);
      setValue('character', user.extra.character);
    }

    if (user && user.extra && user.extra.providerAccountId) {
      setValue('providerAccountId', user.extra.providerAccountId);
    }
  }, [user, setValue]);

  const onSubmit = async (data: Pick<UserData, 'extra'>) => {
    const _id = session?.user.id;
    if (!_id) return console.log('User not found');
    const res = await patchUser(_id, data);
    if (res) router.push('/home');
  };

  return (
    <>
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
    </>
  );
};
export default Step5Form;
