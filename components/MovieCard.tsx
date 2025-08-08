import { motion } from "framer-motion";
import React, { RefObject } from "react";

type MovieCardProps = {
  children: React.ReactNode;
  ref: RefObject<HTMLDivElement>;
  styleIndex: number;
  onDragEnd: (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: any
  ) => void;
};

export default function MovieCard({
  children,
  ref,
  styleIndex,
  onDragEnd
}: MovieCardProps) {
  return (
    <motion.div
      ref={ref}
      className="absolute w-[320px] sm:w-[360px] h-[480px] rounded-xl shadow-2xl overflow-hidden cursor-grab"
      initial={{
        scale: 1 - styleIndex * 0.02,
        y: styleIndex * 8,
        rotate: (styleIndex - 2) * 2,
        opacity: 1 - styleIndex * 0.05
      }}
      style={{ zIndex: 50 + styleIndex }}
      drag
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={onDragEnd}
    >
      {children}
    </motion.div>
  );
}
