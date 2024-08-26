import { AuthBase as Base } from 'next-auth';

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

  interface AuthBase extends Base {
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

  interface User extends AuthBase {
    isNewUser: boolean;
  }

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
