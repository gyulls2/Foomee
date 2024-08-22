'use client';

import { ResponsiveLine } from '@nivo/line';

const data = [
  {
    id: 'weight',
    color: 'hsl(43, 100%, 60%)',
    data: [
      {
        x: '2024.08.01',
        y: 70,
      },
      {
        x: '2024.08.02',
        y: 71,
      },
      {
        x: '2024.08.03',
        y: 70.5,
      },
      {
        x: '2024.08.04',
        y: 71.2,
      },
      {
        x: '2024.08.05',
        y: 70.8,
      },
      {
        x: '2024.08.06',
        y: 71.5,
      },
      {
        x: '2024.08.07',
        y: 70.9,
      },
    ],
  },
];

const WeightChart = () => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 30, right: 20, bottom: 10, left: 20 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ from: 'color' }}
      pointLabelYOffset={-14}
      useMesh={false}
      enablePointLabel={true} // 포인트 위에 데이터 표시
      legends={[]}
      lineWidth={4}
      colors={{ datum: 'color' }}
      theme={{
        dots: {
          text: {
            fontSize: 16, // 텍스트 크기
            fontWeight: '600',
          },
        },
      }}
    />
  );
};

export default WeightChart;
