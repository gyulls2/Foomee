'use client';

import { TWeightData } from '@/types';
import { ResponsiveLine, Point } from '@nivo/line';
import moment from 'moment';
import { useEffect, useState } from 'react';

type Props = {
  startDate: Date;
  weightData: TWeightData[];
};

const WeightChart = ({ startDate, weightData }: Props) => {
  const [chartData, setChartData] = useState<TWeightData[]>([]);

  useEffect(() => {
    const startOfRange = moment(startDate).subtract(6, 'days');

    const filteredData = [];

    // 초기 값으로 startDate를 기준으로 가장 가까운 과거 데이터를 찾음
    let previousData = weightData.find(item =>
      moment(item.x, 'YYYY.MM.DD').isSameOrBefore(startOfRange),
    ) || { x: moment(startOfRange).format('YYYY.MM.DD'), y: 0 };

    for (let i = 0; i <= 6; i++) {
      const currentDate = moment(startOfRange)
        .add(i, 'days')
        .format('YYYY.MM.DD');
      const dataForDate = weightData.find(item => item.x === currentDate);

      if (dataForDate) {
        // 현재 날짜에 해당하는 데이터가 존재하면 그 데이터를 사용
        filteredData.push(dataForDate);
        previousData = dataForDate;
      } else if (previousData) {
        // 현재 날짜에 해당하는 데이터가 없으면 전날의 데이터를 복사하여 사용
        filteredData.push({
          x: currentDate,
          y: previousData.y,
          isDerived: true, // 파생된 데이터
        });
      }
    }
    console.log('weight: ', filteredData);
    setChartData(filteredData);
  }, []);

  return (
    <ResponsiveLine
      data={[
        {
          id: 'weight',
          color: 'hsl(43, 100%, 60%)',
          data: chartData,
        },
      ]}
      margin={{ top: 30, right: 30, bottom: 10, left: 30 }}
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
      pointLabel={(datum: Point) => {
        const customDatum = datum.data as unknown as TWeightData;
        return customDatum.isDerived ? '' : `${customDatum.y}`;
      }}
      legends={[]}
      lineWidth={4}
      colors={{ datum: 'color' }}
      theme={{
        dots: {
          text: {
            fontSize: 14,
            fontWeight: '600',
          },
        },
      }}
    />
  );
};

export default WeightChart;
