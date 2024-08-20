'use client';

import { ResponsivePie } from '@nivo/pie';
import { useEffect, useState } from 'react';

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
};

const MainChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData([
        { color: 'hsl(110, 70%, 50%)', id: 'javascript', value: 167 },
        { color: 'hsl(231, 70%, 50%)', id: 'stylus', value: 507 },
        { color: 'hsl(142, 70%, 50%)', id: 'haskell', value: 112 },
        { color: 'hsl(245, 70%, 50%)', id: 'make', value: 274 },
      ]);
    }, 500); // 500ms 후에 데이터를 설정

    return () => clearTimeout(timeout); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  return (
    <div
      style={{ height: commonProperties.height, width: commonProperties.width }}
    >
      <ResponsivePie
        {...commonProperties}
        innerRadius={0.8}
        padAngle={0.5}
        cornerRadius={5}
        enableArcLabels={false}
        arcLinkLabel={d => `${d.id} (${d.formattedValue})`}
        activeInnerRadiusOffset={commonProperties.activeOuterRadiusOffset}
        layers={['arcs', 'arcLabels', 'legends']}
        transitionMode="startAngle"
        data={data}
      />
    </div>
  );
};

export default MainChart;
