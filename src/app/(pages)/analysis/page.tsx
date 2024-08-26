'use client';

import { ArrowCircleIcon } from '@/components/icons/IconComponents';
import BottomNav from '@/components/layout/BottomNav';
import { getChatResponse } from '@/data/actions/chatAction';
import { fetchPosts } from '@/data/fetch/postFetch';
import { Post } from '@/types';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const customMarkdownComponents = {
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-medium my-4" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base leading-relaxed my-2" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-5 my-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-5 my-2" {...props} />
  ),
};

const type = ['breakfast', 'lunch', 'dinner', 'snack'];

function getDay(day = 0) {
  return moment().add(day, 'days').format('YYYY.MM.DD');
}

type DietType = {
  type: string;
  content: Pick<Post, 'extra'>;
};

const AnalysisPage = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [dietList, setDietList] = useState<DietType[]>([]);
  const router = useRouter();

  // TODO: 로딩 스피너 추가
  // TODO: alert대신 모달로 변경

  // 오늘 식단 조회
  useEffect(() => {
    const fetchFoodList = async () => {
      const allItems = await Promise.all(
        type.map(async meal => {
          const response = await fetchPosts(meal, undefined, getDay(0));
          return response?.map(item => ({
            type: item.type,
            content: item.extra,
          }));
        }),
      );
      setDietList(allItems.flat() as DietType[]);
    };
    fetchFoodList();

    return () => {
      setDietList([]);
    };
  }, [prompt]);

  // OpenAI API 호출
  const handleSubmit = async () => {
    if (dietList.length === 0) {
      alert('식단을 먼저 입력해주세요.');
      return router.push('/search');
    }
    const result = dietList
      ?.map(
        item => `Type: ${item.type}, Content: ${JSON.stringify(item.content)}`,
      )
      .join(', ');

    const newPrompt = `오늘 내가 먹은 식단을 분석해줘! 식단은 ${result} 이야. 결과에서 식단 요약은 간단하게 음식명만 표시하고, 영양성분 계산은 제외해줘.`;
    setPrompt(newPrompt);
    setLoading(true);
    try {
      const response = await getChatResponse(newPrompt);
      if (response) {
        setResponse(response);
      }
    } catch (error) {
      console.error(error);
      console.log('Error occurred while fetching the response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      <header className="text-center relative w-full h-12 px-8 py-4">
        <h1 className="font-semibold text-xl">AI 식단분석</h1>
      </header>
      <section className="py-2.5 flex flex-col gap-16 relative w-full pt-8 h-full min-h-without-header-tab">
        <div className="w-full min-h-without-header-tab px-8 flex flex-col gap-4 justify-end pb-28">
          <div className="w-fit max-w-[100%] rounded-t-[20px] rounded-br-[20px] px-6 py-3 flex flex-col justify-center items-start bg-[#F8F9FE] text-base mr-auto break-words animate-fadeInUp opacity-0">
            오늘의 영양 밸런스를 체크해볼까요?
          </div>
          <div
            className="w-fit max-w-[100%] rounded-t-[20px] rounded-br-[20px] px-6 py-3 flex flex-col justify-center items-start bg-[#F8F9FE] text-base mr-auto animate-fadeInUp opacity-0"
            style={{ animationDelay: '0.4s' }}
          >
            AI 매니저의 분석으로 건강한 습관을 만들어보세요!
          </div>

          {prompt && (
            <div className="w-fit max-w-[80%] rounded-t-[20px] rounded-bl-[20px] px-6 py-3 flex justify-center items-center bg-[#ffb800] text-base ml-auto text-right animate-fadeInUp opacity-0">
              오늘 식단을 분석해줘!
            </div>
          )}
          {response && !loading && (
            <div className="w-fit max-w-[100%] rounded-t-[20px] rounded-br-[20px] px-6 py-5 flex flex-col justify-center items-start bg-[#F8F9FE] text-base mb-10 mr-auto text-left break-words animate-fadeInUp">
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="/images/profile_orange.png"
                  alt="AI 매니저"
                  width={36}
                  height={36}
                  className="rounded-full bg-white"
                />
                <span className="font-semibold mt-2">AI 매니저</span>
              </div>
              <ReactMarkdown components={customMarkdownComponents}>
                {response}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 px-8 pb-20 pt-4 max-w-[475px] w-full mx-auto bg-white">
          <input
            className="rounded-full w-full h-14 bg-[#F8F9FE] px-6 focus:border-orange-400 focus:outline-none"
            defaultValue="오늘 식단을 분석해줘!"
            readOnly
          />
          <button
            type="button"
            className="absolute top-6 right-10"
            onClick={handleSubmit}
          >
            <ArrowCircleIcon width="38" height="38" fill="#ffb800" />
          </button>
        </div>
      </section>

      <BottomNav />
    </main>
  );
};

export default AnalysisPage;
