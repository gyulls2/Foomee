import { ApiRes, SingleItem, UserData } from '@/types';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const LIMIT = process.env.NEXT_PUBLIC_LIMIT;
const DELAY = process.env.NEXT_PUBLIC_DELAY;

/**
  * 사용자 정보 조회
  * @param _id 사용자 ID
  * @param accessToken 사용자 액세스 토큰
  * @returns 사용자 정보
 */
export async function fetchUser(_id: number, accessToken: string) {
  const url = `${SERVER}/users/${_id}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-id': '04-Foomee',
      'Authorization': `Bearer ${accessToken}`
    },
  });
  const resJson: ApiRes<SingleItem<UserData>> = await res.json();
  if (!resJson.ok) {
    return null;
  }
  console.log('resJson : ', resJson);
  return resJson.item;
}
