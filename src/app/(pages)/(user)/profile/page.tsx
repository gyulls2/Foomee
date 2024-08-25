import BottomNav from '@/components/layout/BottomNav';
import ProfileSection from './ProfileSection';
import { auth } from '@/auth';
import { UserData } from '@/types';
import { fetchUser } from '@/data/fetch/userFetch';
import { fetchPosts } from '@/data/fetch/postFetch';
import moment from 'moment';

const ProfilePage = async () => {
  const session = await auth();

  // 사용자 정보 조회
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
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      <ProfileSection user={user} formattedWeightDiff={formattedWeightDiff} />

      <BottomNav />
    </main>
  );
};

export default ProfilePage;
