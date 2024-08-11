import { CloseIcon } from '@/components/icons/IconComponents';
import postDelete from '@/data/fetch/postDelete';
import { Post } from '@/types';

type Props = {
  item: Post;
  setRefresh: (value: boolean) => void;
};

const FoodCard = ({ item, setRefresh }: Props) => {
  const handleDeleteFood = async () => {
    const response = await postDelete(item._id);
    if (response) setRefresh(true);
  };

  return (
    <div className="flex justify-between items-center py-8 border-b last:border-b-0">
      <div>
        <p className="mb-2">{item.extra?.foodNm}</p>
        <p className="text-sm text-gray-400">{item.extra?.inputQua}g</p>
      </div>
      <div className="flex text-right gap-2">
        <p className="font-semibold">{item.extra?.enerc}kcal</p>
        <button onClick={handleDeleteFood}>
          <CloseIcon width="18" height="18" fill="#b3b3b3" />
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
