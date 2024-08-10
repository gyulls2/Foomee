import { AddIcon } from '@/components/icons/IconComponents';

type Props = {};

const AddFoodCard = ({ item, setIsOpened, setFoodData }) => {
  const handleOpenSheet = () => {
    setFoodData(item);
    setIsOpened(true);
  };

  return (
    <div className="flex items-center justify-between px-8 py-6 bg-white rounded-2xl mb-4">
      <div>
        <span className="text-lg font-semibold">
          {item.FOOD_NM_KR.replaceAll('_', ' ')}
        </span>
        <p className="text-sm text-gray-500 pt-1">
          1인분 ({item.SERVING_SIZE})
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center bg-[#FFB800] rounded-full"
          onClick={handleOpenSheet}
        >
          <AddIcon fill="#ffffff" />
        </button>
        <span className="text-sm font-medium text-gray-500">
          {item.AMT_NUM1}kcal
        </span>
      </div>
    </div>
  );
};

export default AddFoodCard;
