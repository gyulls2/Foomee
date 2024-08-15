import moment from 'moment';
import { create } from 'zustand';

type DateState = {
  date: Date;
  getDate: () => string;
  setDate: (date: Date) => void;
  reset: () => void;
};

const useDateStore = create<DateState>((set, get) => ({
  date: new Date(),
  getDate: () => moment(get().date).format('YYYY.MM.DD'),
  setDate: date => set({ date }),
  reset: () => set({ date: new Date() }),
}));

export default useDateStore;
