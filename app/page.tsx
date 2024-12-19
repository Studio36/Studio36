import Offer from "./components/home/offer/Offer";
import StageCarousell from "./components/home/hero/StageCarousell";
import ImageScreen from "./components/home/img-screen/ImageScreen";
import RulesAndBenefits from "./components/home/rules/RulesAndBenefits";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";

export default function Home() {
  return (
    <>
      <StageCarousell />
      <Offer />
      <ImageScreen />
      <RulesAndBenefits />
      <Footer />
    </>
  );
}