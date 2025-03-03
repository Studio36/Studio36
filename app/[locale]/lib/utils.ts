import { Service } from "@prisma/client";
import { cubicBezier } from "motion/react";

export const easeInOutCubic = cubicBezier(0.65, 0, 0.35, 1);
export function easeInOutCubicMath (x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

import React from 'react';

// Get mouse position

const useMousePosition = () => {
  const [
    mousePosition,
    setMousePosition
  ] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;

export const responsiveMax = 1024;

// Carousell Texts

export const carousellNumbers = ["01", "02", "03", "04"];