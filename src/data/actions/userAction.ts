'use server';

import { UserForm } from '@/types';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

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
