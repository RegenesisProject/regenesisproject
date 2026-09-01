import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7E4F11] via-[#E2B13D] to-[#FFD700] z-[100] origin-left shadow-[0_0_8px_rgba(226,177,61,0.8)]"
      style={{ scaleX }}
    />
  );
};
