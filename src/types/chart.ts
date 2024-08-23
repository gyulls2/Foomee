export type FilterType = 'daily' | 'weekly' | 'monthly';

export interface TCalorieData {
  date: string;
  enerc: number;
}

export interface TChartData {
  x: string;
  y: number;
  isDerived: boolean;
}
