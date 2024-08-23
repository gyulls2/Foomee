'use client';

type FilterType = 'daily' | 'weekly' | 'monthly';

type Props = {
  filter: FilterType;
  setFilter: (index: FilterType) => void;
};

const ToggleButton: React.FC<Props> = ({ filter, setFilter }) => {
  const toggle = (index: FilterType) => {
    setFilter(index);
  };

  return (
    <div className="w-full py-4 px-1 flex items-center rounded-full cursor-pointer bg-point-light-orange relative mt-6">
      <div
        className={`transform transition-transform duration-300 bg-white rounded-full w-[33%] py-3 flex items-center justify-center absolute top-1 bottom-1 ${filter === 'daily' ? 'translate-x-0' : filter === 'weekly' ? 'translate-x-[98%]' : 'translate-x-[197%]'}`}
      ></div>
      <div className="w-1/3 text-center z-10" onClick={() => toggle('daily')}>
        <span className="font-medium text-gray-700">일간</span>
      </div>
      <div className="w-1/3 text-center z-10" onClick={() => toggle('weekly')}>
        <span className="font-medium text-gray-700">주간</span>
      </div>
      <div className="w-1/3 text-center z-10" onClick={() => toggle('monthly')}>
        <span className="font-medium text-gray-700">월간</span>
      </div>
    </div>
  );
};

export default ToggleButton;
