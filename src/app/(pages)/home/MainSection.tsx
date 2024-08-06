'use client';

import useUserStore from '@/zustand/userStore';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const MainSection = () => {
  const { data: session } = useSession();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (session?.user) {
      setUser({
        _id: session.user._id,
        type: session.user.type || 'user',
        name: session.user.name || '',
        email: session.user.email || '',
        profileImage: session.user.image || '',
        token: {
          accessToken: session.user.accessToken || '',
          refreshToken: session.user.refreshToken || '',
        },
        extra: session.user.extra || null,
      });
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center p-8 w-full main-content-min-height bg-[#FFFBF1]">
      <div className="flex flex-col items-center pb-6 flex-grow">
        <div className="border border-black py-1 px-4 rounded-full text-sm mb-4">
          {user?.name}님
        </div>
        <div className="relative flex flex-col items-center justify-center flex-grow">
          <div className="relative w-[340px] h-[340px] rounded-full overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(255, 221, 134, 1) 0%, rgba(255, 221, 134, 0.8) 30%, rgba(255, 251, 241, 0) 70%)',
              }}
            ></div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-9xl font-medium">1130</span>
            <span className="text-2xl">kcal</span>
          </div>
          <div className="absolute top-0 left-0 w-40 h-40">
            {/* TODO: 차트 삽입 */}
          </div>

          <div className="flex flex-col items-center mt-4">
            <div className="w-10 h-0.5 bg-black mb-6"></div>
            <p className="text-base">{user?.extra?.goal_calories} kcal</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full pb-8">
        <div className="bg-[#FFC632] rounded-[20px] px-4 py-6 flex flex-col">
          <h3 className="font-semibold text-white">순탄수</h3>
          <p className="text-sm text-white">
            0 / {user?.extra?.carbohydrates}g
          </p>
          <div className="w-full h-1.5 bg-[#FFEDC1] rounded-full mt-10 relative">
            <div className="w-1/2 h-1.5 bg-[#FF8A00] rounded-l-full absolute top-0 left-0"></div>
          </div>
        </div>
        <div className="bg-[#FF6363] rounded-[20px] px-4 py-6 flex flex-col">
          <h3 className="font-semibold text-white">단백질</h3>
          <p className="text-sm text-white">0 / {user?.extra?.protein}g</p>
          <div className="w-full h-1.5 bg-[#FFD0D0] rounded-full mt-10 relative">
            <div className="w-1/2 h-1.5 bg-[#B1004B] rounded-l-full absolute top-0 left-0"></div>
          </div>
        </div>
        <div className="bg-[#FF9C65] rounded-[20px] px-4 py-6 flex flex-col">
          <h3 className="font-semibold text-white">지방</h3>
          <p className="text-sm text-white">0 / {user?.extra?.fat}g</p>
          <div className="w-full h-1.5 bg-[#FFE1D0] rounded-full mt-10 relative">
            <div className="w-1/2 h-1.5 bg-[#FF5B00] rounded-l-full absolute top-0 left-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
