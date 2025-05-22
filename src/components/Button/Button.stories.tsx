import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/common/Button',
  component: Button,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: '확인',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    label: '취소',
    variant: 'secondary',
    size: 'md',
  },
};

export const Outline: Story = {
  args: {
    label: '테두리형',
    variant: 'outline',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: '큰 버튼',
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    label: '작은 버튼',
    size: 'sm',
  },
};
