import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";

import { Delete } from "@/assets/Icons";

const meta = {
  title: "'Components/common/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "기본 이미지 아이콘 컴포넌트입니다. src를 직접 받아 렌더링합니다.",
      },
    },
  },
  argTypes: {
    src: {
      control: false,
    },
    name: {
      control: "text",
      description: "alt에 사용될 이름입니다.",
    },
    size: {
      control: "number",
      description: "가로/세로 크기(px)",
      defaultValue: 24,
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof Icon>;

export const Basic: Story = {
  args: {
    src: Delete,
    size: 32,
  },
};
