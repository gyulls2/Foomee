import { AuthBase } from 'next-auth';

declare module 'next-auth' {
  interface ExtraInfo {
    character: 'orange' | 'peach' | 'cabbage';
    gender: string;
    age: number;
    height: number;
    activity_level: string;
    starting_weight: number;
    goal_weight: number;
    goal_calories: number;
    carbohydrates: number;
    protein: number;
    fat: number;
  }

  interface AuthBase {
    _id: number;
    type: string;
    email?: string;
    name: string;
    profileImage?: string;
    accessToken: string;
    refreshToken: string;
    createdAt?: string;
    updatedAt?: string;
    extra?: ExtraInfo;
  }

  interface User extends AuthBase {}

  interface Session extends AuthBase {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}
