'use server';

import { UserData, UserForm } from '@/types';
import { getSession } from '../actions/authAction';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function patchUser(
  _id: number,
  formData: Pick<UserData, 'extra'>,
) {
  const session = await getSession();
  const accessToken = session?.accessToken;
  console.log('accessToken', accessToken);
  try {
    const res = await fetch(`${SERVER}/users/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'client-id': `${CLIENT_ID}`,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ extra: formData }),
    });

    if (!res.ok) {
      throw new Error('Failed to patch user');
    }

    return res.ok;
  } catch (error) {
    console.error('Error patch user:', error);
  }
}

export async function signup(formData: UserForm) {
  const userData = {
    type: formData.type || 'user',
    name: formData.name,
    email: formData.email,
    password: formData.password,
    profileImage: '',
  };

  try {
    const res = await fetch(`${SERVER}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'client-id': `${CLIENT_ID}`,
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error('Failed to sign up');
    }

    const data = await res.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
  }
}
