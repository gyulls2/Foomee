import { create } from 'zustand';

type NutritionState = {
  nutrition: {
    enerc: number;
    prot: number;
    fatce: number;
    chocdf: number;
  };
  setNutrition: (state: NutritionState['nutrition']) => void;
  reset: () => void;
};

const useNutritionStore = create<NutritionState>(set => ({
  nutrition: {
    enerc: 0, // 총 칼로리
    prot: 0, // 단백질
    fatce: 0, // 지방
    chocdf: 0, // 탄수화물
  },
  setNutrition: state => set({ nutrition: state }),
  reset: () => set({ nutrition: { enerc: 0, prot: 0, fatce: 0, chocdf: 0 } }),
}));

export default useNutritionStore;
