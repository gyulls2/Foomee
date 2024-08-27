import { FoodDataResponse } from '@/types';

export const foodApiFetch = async (
  foodName: string,
  pageNo: number = 1,
): Promise<FoodDataResponse | null> => {
  try {
    const url =
      'https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo01/getFoodNtrCpntDbInq01';
    // const encodedApiKey = encodeURIComponent(API_KEY ?? '').replace(
    //   /\+/g,
    //   '%2B',
    // );

    const queryParams =
      '?' +
      encodeURIComponent('serviceKey') +
      '=' +
      encodeURIComponent(process.env.NEXT_PUBLIC_API_KEY ?? '') +
      '&' +
      encodeURIComponent('pageNo') +
      '=' +
      encodeURIComponent(pageNo.toString()) +
      '&' +
      encodeURIComponent('numOfRows') +
      '=' +
      encodeURIComponent('20') +
      '&' +
      encodeURIComponent('type') +
      '=' +
      encodeURIComponent('json') +
      '&' +
      encodeURIComponent('FOOD_NM_KR') +
      '=' +
      encodeURIComponent(foodName);

    const response = await fetch(url + queryParams);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const resJson = await response.json();
    return resJson.body;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
