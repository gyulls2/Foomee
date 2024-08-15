'use client';

import {
  ArrowCircleIcon,
  BackArrowIcon,
} from '@/components/icons/IconComponents';
import BottomNav from '@/components/layout/BottomNav';
import { getChatResponse } from '@/data/actions/chatAction';
import { useState } from 'react';

const AnalysisPage = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // OpenAI API 호출
  const handleSubmit = async () => {
    setPrompt('오늘 식단을 분석해줘!');
    setLoading(true);
    try {
      const result = await getChatResponse(prompt);
      if (result) {
        setResponse(result);
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
        <button className="absolute left-6 top-4">
          <BackArrowIcon />
        </button>
      </header>
      <section className="py-2.5 px-8 flex flex-col gap-16 relative w-full pt-8 h-full min-h-without-header-tab">
        <div>
          {prompt && (
            <div className="w-fit max-w-[80%] rounded-t-[20px] rounded-bl-[20px] px-8 py-3 flex justify-center items-center bg-[#ffb800] text-base mb-6 ml-auto text-right break-words">
              {prompt}
            </div>
          )}
          {response && !loading && (
            <div className="w-fit max-w-[80%] rounded-t-[20px] rounded-br-[20px] px-8 py-5 flex flex-col justify-center items-start bg-[#F8F9FE] text-base mb-6 mr-auto text-left break-words">
              <span className="font-semibold mb-2">AI 비서</span>
              {response}
            </div>
          )}
        </div>

        <div className="mt-auto relative mb-2 justify-items-end">
          <input
            className="rounded-full w-full h-14 bg-[#F8F9FE] px-6 focus:border-orange-400 focus:outline-none"
            placeholder="오늘 식단을 분석해줘!"
          />
          <button
            type="button"
            className="absolute bottom-2.5 right-4"
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
