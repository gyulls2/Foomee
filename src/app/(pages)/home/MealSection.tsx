import { AddIcon } from '@/components/icons/IconComponents';
import Image from 'next/image';
import MealCard from './MealCard';

const MealList = [
  {
    name: '아침',
    type: 'breakfast',
    icon: '/images/asset_tomato.png',
    width: 40,
    height: 40,
  },
  {
    name: '점심',
    type: 'lunch',
    icon: '/images/asset_lime.png',
    width: 40,
    height: 40,
  },
  {
    name: '저녁',
    type: 'dinner',
    icon: '/images/asset_egg.png',
    width: 36,
    height: 45,
  },
  {
    name: '간식',
    type: 'snack',
    icon: '/images/asset_avocado.png',
    width: 45,
    height: 66,
  },
];

const MealSection = () => {
  return (
    <div className="grid grid-cols-2 gap-6 w-full p-4 pb-10">
      {MealList.map((meal, index) => (
        <MealCard key={index} meal={meal} />
      ))}
    </div>
  );
};

export default MealSection;
