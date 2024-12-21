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


  return (
    <>
      <CustomCursour isActive={isActive}/>
      <StageCarousell setIsActive={setIsActive}/>
      <Offer />
      <ImageScreen />
      <RulesAndBenefits />
      <Footer />
    </>
  );
}