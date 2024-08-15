export interface FoodData {
  FOOD_CD: string; // 식품코드
  FOOD_NM_KR: string; // 식품명
  SERVING_SIZE: string; // 영양성분함량기준량
  AMT_NUM1: string; // 에너지(kcal)
  AMT_NUM3: string; // 단백질(g)
  AMT_NUM4: string; // 지방(g)
  AMT_NUM7: string; // 탄수화물(g)

  // 추가적인 속성들은 선택적으로 정의
  [key: string]: string | undefined;
}

export interface FoodDataResponse {
  items: FoodData[];
  totalCount: number;
  pageNo: number;
  numOfRows: number;
}

export interface Total {
  enerc: number;
  prot: number;
  fatce: number;
  chocdf: number;
}
