import type { Meta, StoryObj } from "@storybook/react";
import GoogleMap from "./GoogleMap";

const meta: Meta<typeof GoogleMap> = {
  title: "Components/common/GoogleMap",
  component: GoogleMap,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    address: {
      description: "지도에 표시할 주소",
      control: "text",
    },
    lat: {
      description: "지도의 위도",
      control: "number",
    },
    lng: {
      description: "지도의 경도",
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof GoogleMap>;

export const Seoul: Story = {
  args: {
    address: "서울특별시 강남구 테헤란로 122",
  },
};

export const Busan: Story = {
  args: {
    address: "부산광역시 해운대구 해운대해변로 123",
  },
};

export const Jeju: Story = {
  args: {
    address: "제주특별자치도 제주시 첨단로 123",
  },
};

export const InvalidAddress: Story = {
  args: {
    address: "존재하지 않는 주소 123",
  },
};

export const SpecificCoordinates: Story = {
  args: {
    lat: 37.5665,
    lng: 126.978,
  },
};

export const InvalidCoordinates: Story = {
  args: {
    lat: 999,
    lng: 999,
  },
};
