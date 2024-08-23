'use client';

import { fetchPosts } from '@/data/fetch/postFetch';
import { ComputedBarDatum, ResponsiveBar } from '@nivo/bar';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
moment.locale('ko');

const commonProperties = {
  margin: { top: 30, right: -10, bottom: 40, left: -10 },
  padding: 0.4,
  valueScale: { type: 'linear' },
  axisTop: null,
  axisRight: null,
  axisLeft: null,
  enableGridY: false,
  enableTotals: true,
  legends: [],
  role: 'application',
  borderRadius: 10,
  defs: [
    {
      id: 'grad',
      type: 'linearGradient',
      colors: [
        { offset: 0, color: '#FF9C65' },
        { offset: 100, color: 'rgba(255, 156, 101, 20%)' },
      ],
    },
  ],
  fill: [{ match: { id: 'enerc' }, id: 'grad' }],
};

interface CustomLabelProps {
  bars: readonly ComputedBarDatum<TCalorieData>[];
}

const CustomLabel: React.FC<CustomLabelProps> = ({ bars }) => {
  return bars.map(bar => {
    if (bar.data.value === 0) return null; // 값이 0일 때 아무것도 렌더링하지 않음

    return (
      <text
        key={bar.key}
        x={bar.x + bar.width / 2}
        y={bar.y - 10}
        textAnchor="middle"
        style={{
          fontSize: 14,
          fontWeight: '500',
        }}
      >
        {bar.data.value}
      </text>
    );
  });
};

type TCalorieData = {
  date: string;
  enerc: number;
};

const NutriChart = ({ startDate }: { startDate: Date }) => {
  const [calorieData, setCalorieData] = useState<TCalorieData[]>([]);

  useEffect(() => {
    const fetchCalorie = async () => {
      const keyword = moment(startDate).format('YYYY.MM');
      const response = await fetchPosts('nutri', undefined, keyword);
      if (response) {
        const startOfRange = moment(startDate).subtract(6, 'days');

        const filteredData = [];

        for (let i = 0; i <= 6; i++) {
          const currentDate = moment(startOfRange)
            .add(i, 'days')
            .format('YYYY.MM.DD');
          const dataForDate = response.find(item => item.title === currentDate);

          if (dataForDate) {
            // 현재 날짜에 해당하는 데이터가 존재하면 그 데이터를 사용
            filteredData.push({
              date: dataForDate.title,
              enerc: Number(dataForDate.extra?.enerc) || 0,
            });
          } else {
            // 현재 날짜에 해당하는 데이터가 없으면 0으로 처리
            filteredData.push({
              date: currentDate,
              enerc: 0,
            });
          }
        }
        console.log('nutri:', filteredData);

        setCalorieData(filteredData);
      }
    };
    fetchCalorie();
  }, []);

  return (
    <ResponsiveBar
      {...commonProperties}
      data={calorieData}
      keys={['enerc']}
      indexBy="date"
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
        renderTick: tick => {
          const isToday = moment(tick.value).isSame(moment(), 'day');
          return (
            <g transform={`translate(${tick.x},${tick.y + 20})`}>
              <text
                textAnchor="middle"
                style={{
                  fontSize: 12,
                  fill: isToday ? '#ff7a00' : 'black',
                }}
              >
                <tspan x="0" dy="0">
                  {isToday ? '오늘' : `${moment(tick.value).format('ddd')}`}
                </tspan>
                <tspan x="0" dy="1.2em">
                  {`${moment(tick.value).format('M.D')}`}
                </tspan>
              </text>
            </g>
          );
        },
      }}
      enableLabel={false}
      isInteractive={false}
      indexScale={{ type: 'band', round: true }}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      valueScale={{ type: 'linear', min: 0, max: 'auto' }}
      theme={{
        labels: {
          text: {
            fontSize: 14,
            fontWeight: '600',
          },
        },
      }}
      layers={['grid', 'axes', 'bars', CustomLabel]}
    />
  );
};

export default NutriChart;
