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

export const carousellDescriptionTexts = [
  ["Ciclorama", "Un perete curbat alb, ideal pentru a crea imagini fără margini și a experimenta cu lumina și umbrele.", "Fotoshooturi profesionale, videoclipuri muzicale, campanii comerciale."],
  ["Living Modern","O canapea în stil contemporan, perfect pentru fotografii elegante și ședințe relaxate.", "Fotografie editorială, portrete stilizate, ședințe de familie."],
  ["Vintage","Două canapele în stil vintage care aduc clasă fiecărei fotografii.", "Fotografie tematică, ședințe de modă, filmari podcast."],
  ["Dining","Concepută în stil natural, aceasta aduce un sentiment de căldură și autenticitate fiecărei imagini.", "Fotografie de lifestyle, reclame produse alimentare, ședințe culinare."],
]

// Photosets

export const photosets = [
  [
    "woman1-1.jpg",
    "woman1-2.jpg",
    "woman1-3.jpg",
    "woman1-4.jpg",
    "woman1-5.jpg",
    "woman1-6.jpg",
    "woman1-7.jpg",
    "woman1-8.jpg",
  ],
  [
    "woman2-1.png",
    "woman2-2.png",
    "woman2-3.png",
    "woman2-4.png",
    "woman2-5.png",
    "woman2-6.png",
    "woman2-7.png",
    "woman2-8.png",
    "woman2-9.png",
  ]
]