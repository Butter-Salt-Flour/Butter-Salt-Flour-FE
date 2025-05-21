import type { Meta, StoryObj } from '@storybook/react';
import Map from './Map';

const meta: Meta<typeof Map> = {
  title: 'Components/common/Map',
  component: Map,
  args: {
    lat: 37.5665, // 서울 시청
    lng: 126.978,
    level: 3,
  },
};

export default meta;
type Story = StoryObj<typeof Map>;

export const Seoul: Story = {};

export const Busan: Story = {
  args: {
    lat: 35.1796,
    lng: 129.0756,
    level: 4,
  },
};

export const Jeju: Story = {
  args: {
    lat: 33.4996,
    lng: 126.5312,
    level: 9,
  },
};
