'use client'

import Offer from "./components/home/offer/Offer";
import StageCarousell from "./components/home/hero/StageCarousell";
import ImageScreen from "./components/home/img-screen/ImageScreen";
import RulesAndBenefits from "./components/home/rules/RulesAndBenefits";
import Footer from "./components/footer/Footer";
import CustomCursour from "./components/CustomCursour";
import { useState } from "react";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [cursourText, setCursourText] = useState("VEZI MAI MULTE");
  const [cursourWidth, setCursourWidth] = useState("9.3rem");

  return (
    <>
      <CustomCursour isActive={isActive} text={cursourText} width={cursourWidth}/>
      <StageCarousell setIsActive={setIsActive} setCursourText={setCursourText} setCursourWidth={setCursourWidth}/>
      <Offer setIsActive={setIsActive}/>
      <ImageScreen />
      <RulesAndBenefits />
      <Footer />
    </>
  );
}