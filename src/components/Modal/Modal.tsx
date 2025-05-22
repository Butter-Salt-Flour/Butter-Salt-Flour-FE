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
      <div className="fixed inset-0 z-30 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        />

        <motion.div
          className="relative z-40 items-center justify-center rounded-lg bg-white"
          initial={MODAL_MOTION.initial}
          animate={MODAL_MOTION.animate}
          exit={MODAL_MOTION.exit}
        >
          {children}
        </motion.div>
      </div>
    </Portal>
  );
}
