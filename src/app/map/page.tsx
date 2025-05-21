// src/pages/TestMapPage.tsx
import React from 'react';
import Map from '@/components/Map/Map';

const TestMapPage = () => {
  return (
    <div>
      <h1>지도 테스트</h1>
      <Map lat={37.5665} lng={126.978} />
    </div>
  );
};

export default TestMapPage;
