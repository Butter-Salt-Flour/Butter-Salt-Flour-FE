import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "./Modal";

export default {
  title: "components/common/Modal",
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export const Basic: StoryObj<typeof Modal> = {
  argTypes: {
    isOpen: {
      control: "boolean",
      defaultValue: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "사용자가 원하는 상태 모드에 따라 **모달을 띄우고 닫을 수 있는** 컴포넌트입니다.",
      },
    },
  },
  args: {
    isOpen: false,
  },
  render: (args) => {
    const ModalExample = () => {
      const [isOpen, setIsOpen] = useState(args.isOpen);

      const openModal = () => setIsOpen(true);
      const closeModal = () => setIsOpen(false);

      return (
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={openModal}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            모달 열기
          </button>

          <Modal {...args} isOpen={isOpen} closeModal={closeModal}>
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-[60px] py-9 shadow-sm">
              <h3 className="text-2xl font-semibold">모달입니다.</h3>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="rounded border border-gray-300 bg-white px-4 py-2 hover:bg-gray-100"
                >
                  취소
                </button>
                <button
                  onClick={closeModal}
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  확인하기
                </button>
              </div>
            </div>
          </Modal>
        </div>
      );
    };

    return <ModalExample />;
  },
};
