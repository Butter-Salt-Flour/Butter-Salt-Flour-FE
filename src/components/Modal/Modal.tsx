import React from "react";
import { motion } from "framer-motion";

import { Portal } from "../Portal";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export const MODAL_MOTION = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};

export function Modal({ isOpen, closeModal, children }: Props) {
  return (
    <Portal isOpen={isOpen}>
      <motion.div
        initial={MODAL_MOTION.initial}
        animate={MODAL_MOTION.animate}
        exit={MODAL_MOTION.exit}
        className="fixed inset-0 z-30 flex w-full items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={closeModal}
        />
        <div className="relative z-40 items-center justify-center rounded-lg bg-white">
          {children}
        </div>
      </motion.div>
    </Portal>
  );
}
