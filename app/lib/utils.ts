import { cubicBezier } from "motion/react";

export const quadEaseInOut = cubicBezier(0.65, 0, 0.35, 1);

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

// Carousell Texts

export const carousellNumbers = ["01", "02", "03", "04"];

export const carousellDescriptionTexts = [
  ["Ciclorama", "Un perete curbat alb, ideal pentru a crea imagini fără margini și a experimenta cu lumina și umbrele.", "Fotoshooturi profesionale, videoclipuri muzicale, campanii comerciale."],
  ["Living Modern","O canapea în stil contemporan, perfect pentru fotografii elegante și ședințe relaxate.", "Fotografie editorială, portrete stilizate, ședințe de familie."],
  ["Vintage","Două canapele în stil vintage care aduc clasă fiecărei fotografii.", "Fotografie tematică, ședințe de modă, filmari podcast."],
  ["Dining","Concepută în stil natural, aceasta aduce un sentiment de căldură și autenticitate fiecărei imagini.", "Fotografie de lifestyle, reclame produse alimentare, ședințe culinare."],
]