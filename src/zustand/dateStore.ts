import { create } from 'zustand';

type DateState = {
  date: Date;
  setDate: (date: Date) => void;
  reset: () => void;
};

const useDateStore = create<DateState>(set => ({
  date: new Date(),
  setDate: date => set({ date }),
  reset: () => set({ date: new Date() }),
}));

export default useDateStore;
