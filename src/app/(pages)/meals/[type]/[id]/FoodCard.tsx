import { Food } from '@/app/(pages)/home/MealCard';
import { CloseIcon } from '@/components/icons/IconComponents';

const FoodCard = ({ item }: { item: Food }) => {
  console.log(item);

  return (
    <div className="flex justify-between items-center py-8 border-b last:border-b-0">
      <div>
        <p className="mb-2">{item.foodNm}</p>
        <p className="text-sm text-gray-400">{item.foodSize}</p>
      </div>
      <div className="flex text-right gap-2">
        <p className="font-semibold">{item.enerc}kcal</p>
        <button>
          <CloseIcon width="18" height="18" fill="#b3b3b3" />
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
