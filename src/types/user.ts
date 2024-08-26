export interface UserData {
  _id: number;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  type: string;
  loginType?: string;
  profileImage?: string;
  profile?: string;

  token?: {
    accessToken: string;
    refreshToken: string;
  };

  createdAt?: string;
  updatedAt?: string;

  extra?: {
    providerAccountId?: string;
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
  };
}

export type UserInToken = Required<Pick<UserData, '_id' | 'name'>> &
  Pick<UserData, 'profile'> & {
    accessToken: string;
    refreshToken: string;
  };

export type UserForm = {
  type: 'user' | 'seller';
  name: string;
  email: string;
  password: string;
  attach?: string | string[];
  profileImage?: string;
};

export type OAuthUser = Required<Pick<UserData, 'type' | 'loginType'>> &
  Partial<Pick<UserData, 'name' | 'email' | 'profileImage'>> & {
    extra?: {
      providerAccountId?: string;
    };
  };

export type UserLoginForm = Pick<UserForm, 'email' | 'password'>;
