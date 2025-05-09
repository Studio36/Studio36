import Footer from '../components/footer/Footer'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ProjectsClientContent from '../components/projects/ProjectsClientContent'
import { use } from 'react';

export async function generateMetadata() {
  const t = await getTranslations('projects.meta');
 
  return {
    title: t('title'),
    description: t('description')
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