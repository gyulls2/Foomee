'use client';

import { fetchPosts } from '@/data/fetch/postFetch';
import { TChartData } from '@/types';
import { ResponsiveLine, Point } from '@nivo/line';
import moment from 'moment';
import { useEffect, useState } from 'react';

type Props = {
  startDate: Date;
};

const WeightChart = ({ startDate }: Props) => {
  const [weightData, setWeightData] = useState<TChartData[]>([]);

  useEffect(() => {
    const fetchWeight = async () => {
      const keyword = moment(startDate).format('YYYY.MM');
      const response = await fetchPosts('weight', undefined, keyword);

      if (response) {
        const startOfRange = moment(startDate).subtract(6, 'days');

        const filteredData = [];

        // 초기 값으로 startDate를 기준으로 가장 가까운 과거 데이터를 찾음
        let previousData = response.find(item =>
          moment(item.title, 'YYYY.MM.DD').isSameOrBefore(startOfRange),
        ) || { title: moment(startOfRange).format('YYYY.MM.DD'), content: '0' };

        for (let i = 0; i <= 6; i++) {
          const currentDate = moment(startOfRange)
            .add(i, 'days')
            .format('YYYY.MM.DD');
          const dataForDate = response.find(item => item.title === currentDate);

          if (dataForDate) {
            // 현재 날짜에 해당하는 데이터가 존재하면 그 데이터를 사용
            filteredData.push({
              x: dataForDate.title,
              y: parseFloat(dataForDate.content),
              isDerived: false, // 실제 데이터
            });
            previousData = dataForDate;
          } else if (previousData) {
            // 현재 날짜에 해당하는 데이터가 없으면 전날의 데이터를 복사하여 사용
            filteredData.push({
              x: currentDate,
              y: parseFloat(previousData.content),
              isDerived: true, // 파생된 데이터
            });
          }
        }
        console.log('weight: ', filteredData);
        setWeightData(filteredData);
      }
    };
    fetchWeight();
  }, []);

  return (
    <ResponsiveLine
      data={[
        {
          id: 'weight',
          color: 'hsl(43, 100%, 60%)',
          data: weightData,
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
        const customDatum = datum.data as unknown as TChartData;
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
