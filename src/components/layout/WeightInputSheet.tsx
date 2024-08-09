import React from 'react';
import { CloseIcon } from '../icons/IconComponents';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import postSubmit from '@/data/fetch/postSubmit';
import { Post } from '@/types';
import postPatch from '@/data/fetch/postPatch';

type WeightInput = {
  content: string;
  type?: string;
  title?: string;
};

type Props = {
  isEdit?: boolean;
  post?: Post | null;
  close: () => void;
  setRefresh: (state: boolean) => void;
};

const WeightInputSheet: React.FC<Props> = ({
  close,
  isEdit,
  post,
  setRefresh,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<WeightInput>({ mode: 'onChange' });

  const getDay = (day = 0) => {
    return moment().add(day, 'days').format('YYYY.MM.DD');
  };

  console.log('isEdit', isEdit);

  const postWeight = async (data: WeightInput) => {
    try {
      data.type = 'weight';
      data.title = getDay();
      console.log('data: ', data);

      if (isEdit) {
        // 수정
        await postPatch<WeightInput>(post!._id, {
          body: JSON.stringify(data),
        });
      } else {
        // 생성
        await postSubmit<WeightInput>({
          body: JSON.stringify(data),
        });
      }
    } catch (error) {
      console.error('체중 기록 오류', error);
    } finally {
      // 데이터 다시 불러오기
      setRefresh(true);
      close();
    }
  };

  return (
    <div className="overflow-hidden absolute w-full min-h-screen h-full bg-black/70 z-10">
      <div className="max-w-[475px] bg-white rounded-t-3xl py-14 px-12 flex flex-col gap-12 fixed bottom-0">
        <button className="absolute top-10 right-10" onClick={close}>
          <span className="sr-only">닫기</span>
          <CloseIcon />
        </button>
        <h2 className="leading-5 text-xl text-gray-900">체중 입력</h2>
        <div>
          <form className="relative mt-2" onSubmit={handleSubmit(postWeight)}>
            <input
              id="content"
              type="text"
              {...(isEdit ? { defaultValue: post?.content ?? '' } : {})}
              placeholder="00.0"
              maxLength={5}
              className="w-full text-4xl focus:outline-none focus:border-orange-400 font-semibold text-right pr-40"
              {...register('content', {
                required: true,
                validate: {
                  validFormat: value => {
                    // 세 자리 정수와 소수점 아래 한 자리까지만 허용
                    const regex = /^\d{1,3}(\.\d{0,1})?$/;
                    return (
                      regex.test(value) ||
                      'Please enter a valid weight (e.g., 123.4)'
                    );
                  },
                  withinRange: value => {
                    const num = parseFloat(value);
                    return (
                      (num >= 0 && num <= 200) ||
                      'Please enter a number between 0 and 999.9'
                    );
                  },
                },
              })}
            />
            <span className="absolute top-1 right-28 text-gray-400 text-2xl">
              kg
            </span>
            <button
              type="submit"
              className="rounded-full w-full h-12 mt-12 bg-[#ffb800] text-center font-semibold leading-7 text-lg text-neutral-100 disabled:opacity-50"
              disabled={!isValid || isSubmitting}
            >
              저장
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WeightInputSheet;
