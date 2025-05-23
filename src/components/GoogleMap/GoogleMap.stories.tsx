import type { Meta, StoryObj } from "@storybook/react";
import GoogleMap from "./GoogleMap";

const meta = {
  title: "Components/GoogleMap",
  component: GoogleMap,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    radius: {
      description: "현재 위치로부터의 반경 (미터 단위)",
      control: { type: "range", min: 500, max: 5000, step: 500 },
    },
    enableMasking: {
      description: "반경 마스킹 활성화 여부",
      control: "boolean",
    },
  },
} satisfies Meta<typeof GoogleMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAddress: Story = {
  args: {
    address: "서울특별시 강남구 테헤란로 122",
    radius: 2000,
    enableMasking: false,
  },
};

export const WithCoordinates: Story = {
  args: {
    latitude: 37.5665,
    longitude: 126.978,
    radius: 2000,
    enableMasking: false,
  },
};

export const WithMasking: Story = {
  args: {
    latitude: 37.5665,
    longitude: 126.978,
    radius: 2000,
    enableMasking: true,
  },
};

export const SmallRadiusWithMasking: Story = {
  args: {
    latitude: 37.5665,
    longitude: 126.978,
    radius: 1000,
    enableMasking: true,
  },
};

export const LargeRadiusWithMasking: Story = {
  args: {
    latitude: 37.5665,
    longitude: 126.978,
    radius: 3000,
    enableMasking: true,
  },
};

export const Loading: Story = {
  args: {
    address: "",
  },
};

export const Error: Story = {
  args: {
    address: "Invalid Address",
  },
};
