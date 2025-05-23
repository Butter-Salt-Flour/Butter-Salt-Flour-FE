import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/common/Input',
  component: InputField,
  tags: ['autodocs'],
  args: {
    placeholder: 'Type something...',
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Underline: Story = {
  args: {
    variant: 'underline',
  },
};
