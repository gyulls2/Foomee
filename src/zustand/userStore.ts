import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserData } from '@/types/user';

interface UserState {
  user: UserData | null;
  setUser: (data: UserData) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      setUser: (data: UserData) => set(() => ({ user: data })),
      clearUser: () => set({ user: null }),
    }),
    // { name: 'loginUser', storage: createJSONStorage(() => lacalStorage) },
    { name: 'loginUser', storage: createJSONStorage(() => sessionStorage) },
  ),
);

export default useUserStore;
