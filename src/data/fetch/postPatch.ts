import { getSession } from '../actions/authAction';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

// const LIMIT = process.env.NEXT_PUBLIC_LIMIT;
// const DELAY = process.env.NEXT_PUBLIC_DELAY;

const postPatch = async <T>(
  id: number,
  options: RequestInit = {},
): Promise<T> => {
  const session = await getSession();
  const accessToken = session?.accessToken;

  const url = `${SERVER}/posts/${id}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${accessToken}`,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData: {
      message: string;
    } = await response.json();
    throw new Error(`${response.status} : ${errorData.message}`);
  }
  const responseData: T = await response.json();
  return responseData;
};

export default postPatch;
