'use client'

import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { easeInOutCubicMath } from '../../lib/utils'
import CustomCursour from '../CustomCursour'
import MotionWrapper from '../MotionWrapper'
import ProjectsGrid from './ProjectsGrid'

interface ProjectsClientContentProps {
  children: React.ReactNode;
}


export default function ProjectsClientContent ({children}: ProjectsClientContentProps) {
    const [isActive, setIsActive] = useState(false);
    const [isLinkClicked, setIsLinkClicked] = useState(false);
    const lenis = useLenis();
    const searchParams = useSearchParams();
    const t = useTranslations('projects');
    const cursorText = useTranslations('index.cursorText');
    const locale = useLocale();

    useEffect(() => {
        const section = searchParams.get('section');
          if (section !== null && lenis) {
            setTimeout(() => {
              lenis.scrollTo(`#${section}`, {
                duration: 1, 
                lock: true,
                force: true,
                easing: easeInOutCubicMath,
              }); 
            }, 600)
        }
      }, [lenis, searchParams])
  return (
    <>
        <CustomCursour isActive={isActive} text={cursorText('default')} width={locale === 'en' ? "7rem" : "9.3rem"} isVisible={!isLinkClicked}/>
        <MotionWrapper isLinkClicked={isLinkClicked} setIsLinkClicked={setIsLinkClicked}>
            <div className={`grid grid-cols-3 lg:grid-cols-6 lg:col-start-2 col-span-6 mt-12 lg:mt-24 z-10`}>
                <p className='col-start-2 col-span-2 lg:col-start-4 mb-4 lg:mb-6 text-sm lg:text-base uppercase'>{`[${t('subtitle')}]`}</p>
                <p className='col-span-6 text-2xl lg:leading-tight lg:text-[3rem] font-hedwig indent-[33.3%] lg:indent-[50%] mb-12 lg:mb-24 text-justify'>{t('content')}</p>
                <ProjectsGrid setIsActive={setIsActive} setIsLinkClicked={setIsLinkClicked}/>
            </div>
            {children}
        </MotionWrapper>
    </>
  )
}
