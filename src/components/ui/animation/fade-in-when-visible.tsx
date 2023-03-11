import { motion, useInView } from "framer-motion";
import { CSSProperties, useRef } from "react";

type FadeProps = {
  directionTo?: "up" | "bottom" | "left" | "right";
  children: React.ReactNode;
  style?: CSSProperties;
};

const hiddenInitials = {
  up: { translateY: 20 },
  bottom: { translateY: -20 },
  left: { translateX: 20 },
  right: { translateX: -20 },
}

export default function FadeInWhenVisible({ children, directionTo = "up", style }: FadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const variants = {
    visible: { opacity: 1, translateX: 0, translateY: 0 },
    hidden: { opacity: 0, ...hiddenInitials[directionTo] },
  };

  return (
    <motion.span
      ref={ref}
      initial={variants["hidden"]}
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5 }}
      style={style}
    >
      {children}
    </motion.span>
  );
}
