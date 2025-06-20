import { easeInOutCubic } from "@/app/[locale]/lib/utils";
import { AnimationControls, motion } from "motion/react";

interface Props {
  text: string;
  animate: AnimationControls;
}

const NumbersAmination = ({ text, animate }: Props) => {
  const numbers = text.split("");

  const variants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.15,
        staggerDirection: -1,
      },
    },
  };

  const numbersVariant = {
    initial: { x: "-100%" },
    animate: {
      x: ["120%", "0%"],
      transition: {
        ease: easeInOutCubic,
        duration: 0.6,
      },
    },
    exit: {
      x: "120%",
      transition: {
        ease: easeInOutCubic,
        duration: 0.6,
      },
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="animate"
      animate={animate}
      className="flex gap-[1px] text-[3.25rem] font-hedwig mb-[1.5rem]"
    >
        <div className="overflow-hidden">
            <motion.p className="leading-[0.8]" variants={numbersVariant}>{numbers[0]}</motion.p>
        </div>
        <div className="overflow-hidden">
            <motion.p className="leading-[0.8]" variants={numbersVariant}>{numbers[1]}</motion.p>
        </div>
    </motion.div>
  );
};

export default NumbersAmination;
