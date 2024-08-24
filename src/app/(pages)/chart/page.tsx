import BottomNav from '@/components/layout/BottomNav';
import Slider from './Slider';
import { auth } from '@/auth';
import { UserData } from '@/types';
import { fetchUser } from '@/data/fetch/userFetch';
import moment from 'moment';
import { fetchPosts } from '@/data/fetch/postFetch';

const ChartPage = async () => {
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

  // 섭취 칼로리 데이터 불러오기
  const fetchCalorie = async () => {
    const keyword = moment(new Date()).format('YYYY.MM.DD');
    const response = await fetchPosts('nutri', undefined, keyword);
    if (response.length > 0) {
      return response[0].extra?.enerc;
    } else {
      return 0;
    }
  };
  const enerc = await fetchCalorie();

  // 가장 최근 체중 데이터 불러오기
  const fetchWeight = async () => {
    const response = await fetchPosts('weight');
    if (response.length > 0) {
      const mostRecent = response.reduce((latest, current) => {
        const latestDate = moment(latest.title, 'MMMM.YY.DD');
        const currentDate = moment(current.title, 'MMMM.YY.DD');

        return currentDate.isAfter(latestDate) ? current : latest;
      });
      return parseFloat(mostRecent.content);
    } else {
      return 0;
    }
  };
  const weight = await fetchWeight();

  const weightDiff = (user?.extra?.starting_weight ?? 0) - weight;
  const formattedWeightDiff =
    weightDiff > 0 ? `-${weightDiff}` : `+${Math.abs(weightDiff)}`;

  return (
    <main className="flex-col justify-center min-h-screen h-full ">
      <section className="pb-20 px-8 flex flex-col gap-6 relative w-full pt-8 h-full min-h-without-tab bg-bg-light-yellow justify-center">
        <div>
          <h2 className="text-lg font-semibold">
            오늘 하루 {enerc}kcal 먹었어요.
          </h2>
          <p className="mt-2">
            ⛳ 목표 {user?.extra?.goal_weight}kg 😊 지금까지
            {formattedWeightDiff}kg
          </p>
        </div>
        <Slider />
      </section>

      <BottomNav />
    </main>
  );
};

export default ChartPage;
