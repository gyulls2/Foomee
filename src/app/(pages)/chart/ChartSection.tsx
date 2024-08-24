import { TCalorieData, TWeightData } from '@/types';
import NutriChart from './NutriChart';
import WeightChart from './WeightChart';

type Props = {
  startDate: Date;
  filter: 'daily' | 'weekly' | 'monthly';
  calorieData: TCalorieData[];
  weightData: TWeightData[];
};

const ChartSection = ({
  startDate,
  filter,
  calorieData,
  weightData,
}: Props) => {
  const iscalorieLoad = calorieData.length === 0;
  const isWeightLoad = weightData.length === 0;
  return (
    <>
      {/* 체중 차트 */}
      <div className="max-w-[410px] h-32 mb-6">
        {!isWeightLoad && (
          <WeightChart
            startDate={startDate}
            filter={filter}
            weightData={weightData}
          />
        )}
      </div>
      <svg width="100%" height="6px">
        <line
          x1="0"
          y1="0"
          x2="420"
          y2="0"
          stroke="#FFECBA"
          strokeWidth="6"
          strokeDasharray="8,6"
        />
      </svg>
      {/* 식단 차트 */}
      <div className="max-w-[410px] h-80 mt-6">
        {!iscalorieLoad && (
          <NutriChart
            startDate={startDate}
            filter={filter}
            calorieData={calorieData}
          />
        )}
      </div>
    </>
  );
};

export default ChartSection;
