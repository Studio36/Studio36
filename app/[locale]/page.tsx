import ImageScreen from "./components/home/img-screen/ImageScreen";
import RulesAndBenefits from "./components/home/rules/RulesAndBenefits";
import Footer from "./components/footer/Footer";
import { getTranslations } from "next-intl/server";
import { AnimatePresence } from "motion/react";
import ClientContent from "./components/home/HomeClientContent";
 
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('index.meta');
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', ro: '/ro' },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Studio 36',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Studio 36',
  description: 'Open space photography and videography studio in Chișinău with 3 furnished zones and a white cyclorama.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chișinău',
    addressRegion: 'Ciocana',
    addressCountry: 'MD',
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://studio36.md',
  knowsAbout: ['Photography', 'Videography', 'Commercial Photography', 'Music Video Production', 'Podcast Recording'],
};

export default async function Home() {
  return (
    <AnimatePresence>
      <script
        key="schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <ClientContent key="content">
        <ImageScreen />
        <RulesAndBenefits />
        <Footer />
      </ClientContent>
    </AnimatePresence>
  );
}