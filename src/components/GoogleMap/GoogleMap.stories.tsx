import type { Meta, StoryObj } from "@storybook/react";
import GoogleMap from "./GoogleMap";

const meta = {
  title: "Components/GoogleMap",
  component: GoogleMap,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GoogleMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAddress: Story = {
  args: {
    address: "서울특별시 강남구 테헤란로 122",
  },
};

export const WithCoordinates: Story = {
  args: {
    latitude: 37.5665,
    longitude: 126.978,
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
