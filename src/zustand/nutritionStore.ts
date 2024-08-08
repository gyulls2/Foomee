import { create } from 'zustand';

type NutritionState = {
  nutrition: {
    enerc: number;
    prot: number;
    fatce: number;
    chocdf: number;
  };
  addNutrition: (newNutrition: Partial<NutritionState['nutrition']>) => void;
  reset: () => void;
};

const useNutritionStore = create<NutritionState>(set => ({
  nutrition: {
    enerc: 0, // 총 칼로리
    prot: 0, // 단백질
    fatce: 0, // 지방
    chocdf: 0, // 탄수화물
  },
  addNutrition: newNutrition =>
    set(state => ({
      nutrition: {
        enerc: state.nutrition.enerc + (newNutrition.enerc || 0),
        prot: state.nutrition.prot + (newNutrition.prot || 0),
        fatce: state.nutrition.fatce + (newNutrition.fatce || 0),
        chocdf: state.nutrition.chocdf + (newNutrition.chocdf || 0),
      },
    })),
  reset: () => set({ nutrition: { enerc: 0, prot: 0, fatce: 0, chocdf: 0 } }),
}));

export default useNutritionStore;
