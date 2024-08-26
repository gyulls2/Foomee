import CloseButton from './CloseButton';

const NutritionPage = () => {
  return (
    <div className="w-full mx-auto py-4 px-8">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-xl font-semibold">영양정보</h1>
        <CloseButton />
      </div>
      <div className="py-4 flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <span className="text-gray-500">총 용량 300g</span>
          <span className="text-2xl font-bold">123 kcal</span>
        </div>
        <hr className="my-4" />
        <div className="mb-4 border-b pb-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium">탄수화물</span>
            <span className="font-bold">11.8 g</span>
          </div>
          <ul className="text-gray-500">
            <li className="flex justify-between">
              - 당<span>-</span>
            </li>
            <li className="flex justify-between">
              - 대체 감미료<span>-</span>
            </li>
            <li className="flex justify-between">
              - 식이섬유<span>-</span>
            </li>
          </ul>
        </div>
        <div className="mb-4 border-b pb-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium">단백질</span>
            <span className="font-bold">9.4 g</span>
          </div>
        </div>
        <div className="mb-4 border-b pb-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium">지방</span>
            <span className="font-bold">4.4 g</span>
          </div>
          <ul className="text-gray-500">
            <li className="flex justify-between">
              - 포화지방<span>1 g</span>
            </li>
            <li className="flex justify-between">
              - 트랜스지방<span>-</span>
            </li>
            <li className="flex justify-between">
              - 다불포화지방<span>-</span>
            </li>
            <li className="flex justify-between">
              - 불포화지방<span>-</span>
            </li>
          </ul>
        </div>
        <div className="mb-4 border-b pb-4">
          <div className="flex justify-between">
            <span className="font-medium">콜레스테롤</span>
            <span>-</span>
          </div>
        </div>
        <div className="mb-4 border-b pb-4">
          <div className="flex justify-between">
            <span className="font-medium">나트륨</span>
            <span className="font-bold">1234 mg</span>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <span className="font-medium">칼륨</span>
            <span>-</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;
