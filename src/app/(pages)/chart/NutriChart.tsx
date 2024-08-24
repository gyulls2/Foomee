'use client';

import { BarDatum, ComputedBarDatum, ResponsiveBar } from '@nivo/bar';
import { FilterType, TCalorieData } from '@/types';
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

type CustomTick = {
  value: moment.MomentInput;
  x: unknown;
  y: number;
};

const dailyRenderTick = (tick: CustomTick) => {
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
};

const weeklyRenderTick = (tick: CustomTick) => {
  const tickDate = moment(tick.value, 'YYYY.MM.DD');
  const isCurrentWeek = moment().isSame(tickDate, 'week');
  const isToday = moment().isSame(tickDate, 'day');

  const label = isCurrentWeek ? '이번주' : `${tickDate.format('M.D')} ~`;

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
          {label}
        </tspan>
      </text>
    </g>
  );
};

const MonthlyRenderTick = (tick: CustomTick) => {
  const tickDate = moment(tick.value, 'YYYY.MM.DD');
  const isCurrentMonth = moment().isSame(tickDate, 'month');

  const label = isCurrentMonth ? '이번달' : tickDate.format('YY.MM');

  return (
    <g transform={`translate(${tick.x},${tick.y + 20})`}>
      <text
        textAnchor="middle"
        style={{
          fontSize: 12,
          fill: isCurrentMonth ? '#ff7a00' : 'black',
        }}
      >
        <tspan x="0" dy="0">
          {label}
        </tspan>
      </text>
    </g>
  );
};

type TCustomDatum = BarDatum & {
  date: string;
  enerc: number;
};

interface CustomLabelProps {
  bars: readonly ComputedBarDatum<BarDatum>[];
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

type Props = {
  startDate: Date;
  filter: FilterType;
  calorieData: TCalorieData[];
};

const NutriChart = ({ startDate, filter, calorieData }: Props) => {
  const [chartData, setChartData] = useState<TCustomDatum[]>([]);

  useEffect(() => {
    const filteredData: TCustomDatum[] = [];
    if (filter === 'daily') {
      const startOfRange = moment(startDate).subtract(6, 'days');
      for (let i = 0; i < 7; i++) {
        const currentDate = moment(startOfRange)
          .add(i, 'days')
          .format('YYYY.MM.DD');
        const dataForDate = calorieData.find(item => item.date === currentDate);

        if (dataForDate) {
          // 현재 날짜에 해당하는 데이터가 존재하면 그 데이터를 사용
          filteredData.push({
            date: dataForDate.date,
            enerc: dataForDate.enerc,
          });
        } else {
          // 현재 날짜에 해당하는 데이터가 없으면 0으로 처리
          filteredData.push({
            date: currentDate,
            enerc: 0,
          });
        }
      }
    } else if (filter === 'weekly') {
      for (let i = 0; i < 7; i++) {
        const startOfWeek = moment(startDate)
          .subtract(i, 'weeks')
          .startOf('week');
        const endOfWeek = moment(startDate).subtract(i, 'weeks').endOf('week');

        const weekData = calorieData.filter(item =>
          moment(item.date).isBetween(startOfWeek, endOfWeek, null, '[]'),
        );

        const avgEnerc =
          weekData.length > 0
            ? parseFloat(
                (
                  weekData.reduce((sum, item) => sum + item.enerc, 0) /
                  weekData.length
                ).toFixed(0),
              )
            : 0;

        filteredData.push({
          date: endOfWeek.format('YYYY.MM.DD'),
          enerc: avgEnerc,
        });
      }
      // 최신 주가 마지막에 추가되므로 역순으로 정렬
      filteredData.reverse();
    } else if (filter === 'monthly') {
      for (let i = 0; i < 7; i++) {
        const startOfMonth = moment(startDate)
          .subtract(i, 'months')
          .startOf('month');
        const endOfMonth = moment(startDate)
          .subtract(i, 'months')
          .endOf('month');

        const monthData = calorieData.filter(item =>
          moment(item.date).isBetween(startOfMonth, endOfMonth, null, '[]'),
        );

        const avgEnerc =
          monthData.length > 0
            ? parseFloat(
                (
                  monthData.reduce((sum, item) => sum + item.enerc, 0) /
                  monthData.length
                ).toFixed(0),
              )
            : 0;

        filteredData.push({
          date: endOfMonth.format('YYYY.MM.DD'),
          enerc: avgEnerc,
        });
      }
      // 최신 월이 마지막에 추가되므로 역순으로 정렬
      filteredData.reverse();
    }
    console.log('filteredData:', filteredData);
    setChartData(filteredData);
  }, [filter]);

  return (
    <ResponsiveBar
      {...commonProperties}
      data={chartData}
      keys={['enerc']}
      indexBy="date"
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
        renderTick:
          filter === 'daily'
            ? dailyRenderTick
            : filter === 'weekly'
              ? weeklyRenderTick
              : MonthlyRenderTick,
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
