import BottomNav from '@/components/layout/BottomNav';
import WeightForm from './WeightForm';
import MainSection from './MainSection';
import MealSection from './MealSection';
import { auth } from '@/auth';
import { fetchUser } from '@/data/fetch/userFetch';
import { UserData } from '@/types';
import Header from './Header';

const HomePage = async () => {
  const session = await auth();

  // 사용자 extra 정보 조회
  const fetchUserData = async (): Promise<UserData | undefined> => {
    if (!session?.user) {
      throw new Error('User is not authenticated');
    }

    try {
      const userData = await fetchUser(session.user._id, session.accessToken);

      if (!userData) {
        throw new Error('Failed to fetch user data');
      }

      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const user = await fetchUserData();

  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      <Header />
      <section className="flex flex-col relative w-full h-full min-h-without-header-tab">
        {/* 메인 페이지 ---------------------------------------------------------------------------------------------- */}
        <MainSection user={user} />
        {/* 식단 기록 ------------------------------------------------------------------------------------- */}
        <div className="flex flex-col bg-[#FFECBA] p-8 w-full">
          <div className="flex items-center space-x-2 mb-4">
            {/* TODO:아이콘 추가 */}
            <h2 className="text-lg font-semibold">먹었어요</h2>
          </div>
          <MealSection />
        </div>

        {/* 체중 기록 -------------------------------------------------------- */}
        <WeightForm user={user} />
      </section>

      <BottomNav />
    </main>
  );
};

export default HomePage;
