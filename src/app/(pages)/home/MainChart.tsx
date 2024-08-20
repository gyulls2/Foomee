'use client';

import useNutritionStore from '@/zustand/nutritionStore';
import { ResponsivePie } from '@nivo/pie';
import { BasicTooltip } from '@nivo/tooltip';
import { ComputedDatum } from '@nivo/pie';
import { useEffect, useState } from 'react';

const PieTooltip = ({ datum }: { datum: ComputedDatum<unknown> }) => (
  <BasicTooltip
    id={datum.id}
    value={`${Math.round(parseFloat(datum.formattedValue))}%`}
    enableChip={true}
    color={datum.color}
  />
);

const commonProperties = {
  activeOuterRadiusOffset: 8,
  animate: true,
  height: 500,
  legends: [],
  margin: {
    bottom: 40,
    left: 60,
    right: 60,
    top: 40,
  },
  width: 475,
  defs: [
    {
      id: 'grad1',
      type: 'linearGradient',
      colors: [
        { offset: 0, color: 'rgba(255, 198, 50, 20%)' },
        { offset: 100, color: '#FFC632' },
      ],
    },
    {
      id: 'grad2',
      type: 'linearGradient',
      colors: [
        { offset: 0, color: 'rgba(255, 99, 99, 20%)' },
        { offset: 100, color: '#FF6363' },
      ],
    },
    {
      id: 'grad3',
      type: 'linearGradient',
      colors: [
        { offset: 0, color: '#FF9C65' },
        { offset: 100, color: 'rgba(255, 156, 101, 20%)' },
      ],
    },
  ],
  fill: [
    { match: { id: '탄수화물' }, id: 'grad1' },
    { match: { id: '단백질' }, id: 'grad2' },
    { match: { id: '지방' }, id: 'grad3' },
  ],
};

const MainChart = () => {
  const [data, setData] = useState<
    { color: string; id: string; value: number }[]
  >([]);
  const { nutrition } = useNutritionStore();

  useEffect(() => {
    const caloriesFromProtein = nutrition?.prot * 4;
    const caloriesFromFat = nutrition?.fatce * 9;
    const caloriesFromCarbs = nutrition?.chocdf * 4;

    const timeout = setTimeout(() => {
      setData([
        {
          color: 'hsl(43, 100%, 60%)',
          id: '탄수화물',
          value: nutrition?.chocdf
            ? (caloriesFromCarbs / nutrition?.enerc) * 100
            : 0.1,
        },
        {
          color: 'hsl(0, 100%, 70%)',
          id: '단백질',
          value: nutrition?.prot
            ? (caloriesFromProtein / nutrition?.enerc) * 100
            : 0.1,
        },
        {
          color: 'hsl(22, 100%, 70%)',
          id: '지방',
          value: nutrition?.fatce
            ? (caloriesFromFat / nutrition?.enerc) * 100
            : 0.1,
        },
      ]);
    }, 500); // 500ms 후에 데이터를 설정

    return () => clearTimeout(timeout); // 컴포넌트 언마운트 시 타이머 정리
  }, [nutrition]);

  return (
    <div
      style={{ height: commonProperties.height, width: commonProperties.width }}
    >
      <ResponsivePie
        {...commonProperties}
        innerRadius={0.8}
        padAngle={1.5}
        cornerRadius={5}
        enableArcLabels={false}
        arcLinkLabel={d => `${d.id} (${d.formattedValue})`}
        activeInnerRadiusOffset={commonProperties.activeOuterRadiusOffset}
        layers={['arcs', 'arcLabels', 'legends']}
        transitionMode="startAngle"
        data={data}
        colors={{ datum: 'data.color' }}
        tooltip={PieTooltip}
        startAngle={-30}
      />
    </div>
  );
};

export default MainChart;
