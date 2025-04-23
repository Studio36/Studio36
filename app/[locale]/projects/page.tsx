import Footer from '../components/footer/Footer'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ProjectsClientContent from '../components/projects/ProjectsClientContent'

export async function generateMetadata() {
  const t = await getTranslations('projects.meta');
 
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function Projects({params}: {params: Promise<{locale: string}>}) {
  // Use the React use() hook to await the params
  const { locale } = await params;
 
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <ProjectsClientContent>
      <Footer/>
    </ProjectsClientContent>
  )
}