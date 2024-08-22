import WeightChart from './WeightChart';

type Props = {
  startDate: Date;
  idx: number;
};

const ChartSection = ({ startDate, idx }: Props) => {
  const day = startDate.toDateString();

  return (
    <>
      {idx}
      {day}
      {/* 체중 차트 */}
      <div className="max-w-[410px] h-40 mb-6">
        <WeightChart />
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
      <div className="w-[410px] h-72 bg-white mt-6">식단 bar 차트</div>
    </>
  );
};

export default ChartSection;
