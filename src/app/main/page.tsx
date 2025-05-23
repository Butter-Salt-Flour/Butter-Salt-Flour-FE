import React from 'react';
import { Button } from '@/components/Button';
const page = () => {
  return (
    <div>
      <Button variant="yes">할래요!</Button>
      <Button variant="no" width={190} height={48}>
        아니요
      </Button>
    </div>
  );
};

export default page;
