import Footer from '../components/footer/Footer'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ProjectsClientContent from '../components/projects/ProjectsClientContent'
import { use } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('projects.meta');
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    alternates: {
      canonical: locale === 'ro' ? '/ro/proiecte' : '/en/projects',
      languages: { en: '/en/projects', ro: '/ro/proiecte' },
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

export default function Projects({params}: {params: Promise<{locale: string}>}) {
  // Use the React use() hook to await the params
  const { locale } = use(params);
 
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <ProjectsClientContent>
      <Footer/>
    </ProjectsClientContent>
  )
}