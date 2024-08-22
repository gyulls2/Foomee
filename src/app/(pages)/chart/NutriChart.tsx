'use client';

import { ResponsiveBar } from '@nivo/bar';

const data = [
  {
    date: '2024.08.01',
    enerc: 1200,
  },
  {
    date: '2024.08.02',
    enerc: 1250,
  },
  {
    date: '2024.08.03',
    enerc: 1210,
  },
  {
    date: '2024.08.04',
    enerc: 1150,
  },
  {
    date: '2024.08.05',
    enerc: 1190,
  },
  {
    date: '2024.08.06',
    enerc: 1300,
  },
  {
    date: '2024.08.07',
    enerc: 1280,
  },
];

const commonProperties = {
  margin: { top: 30, right: -10, bottom: 20, left: -10 },
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

const NutriChart = () => {
  return (
    <ResponsiveBar
      {...commonProperties}
      data={data}
      keys={['enerc']}
      indexBy="date"
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
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
    />
  );
};

export default NutriChart;
