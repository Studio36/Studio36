import ImageScreen from "./components/home/img-screen/ImageScreen";
import RulesAndBenefits from "./components/home/rules/RulesAndBenefits";
import Footer from "./components/footer/Footer";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { use } from "react";
import { AnimatePresence } from "motion/react";
import ClientContent from "./components/home/HomeClientContent";
 
export async function generateMetadata() {
  const t = await getTranslations('index.meta');
 
  return {
    title: t('title'),
    description: t('description')
  };
}

export default function Home({params}: {params: Promise<{locale: string}>;}) {
  const {locale} = use(params);
 
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <AnimatePresence>
      <ClientContent>
        <ImageScreen />
        <RulesAndBenefits />
        <Footer />
      </ClientContent>
    </AnimatePresence>
  );
}