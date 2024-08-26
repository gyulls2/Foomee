'use server';

import { auth } from '@/auth';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

const postSubmit = async <T>(options: RequestInit = {}): Promise<T> => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const url = `${SERVER}/posts`;
  const response = await fetch(url, {
    method: 'POST',
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

export default postSubmit;
