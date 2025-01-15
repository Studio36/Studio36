'use client'

import { useEffect, useState } from 'react'
import ProjectsGrid from '../components/projects/ProjectsGrid'
import Footer from '../components/footer/Footer'
import CustomCursour from '../components/CustomCursour'
import Header from '../components/header/Header'
import { motion } from 'motion/react'
import { easeInOutCubic } from '../lib/utils'
import { useLenis } from 'lenis/react'

export default function page() {
    const [isActive, setIsActive] = useState(false);
    const [isLinkClicked, setIsLinkClicked] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        lenis?.scrollTo(0, {immediate: true, force: true});
    }, [])

  return (
    <>
        <Header setIsLinkClicked={setIsLinkClicked} isLinkClicked={isLinkClicked}/>
        <CustomCursour isActive={isActive} text={"VEZI MAI MULTE"} width={"9.3rem"}/>
        <motion.div initial={'initial'} variants={{initial: {opacity: 0}, animate: {opacity: 100}}} animate={isLinkClicked ? 'initial' : 'animate'} transition={{duration: 0.7, ease: easeInOutCubic}} className="layout-grid col-span-8">
            <div className={`grid grid-cols-3 lg:grid-cols-6 lg:col-start-2 col-span-6 transition duration-700`}>
                <p className='col-start-2 col-span-2 lg:col-start-4 mb-4 lg:mb-6 text-sm lg:text-base uppercase'>[Descoperă Proiectele]</p>
                <p className='col-span-6 text-2xl lg:leading-tight lg:text-[3rem] font-hedwig indent-[33.3%] lg:indent-[50%] mb-12 lg:mb-24 text-justify'>Fiecare proiect creat spune o poveste unică, realizată cu pasiune și atenție la detalii. Portofoliul nostru reflectă expertiza, inovația și angajamentul de a depăși așteptările clienților.</p>
                <ProjectsGrid setIsActive={setIsActive} setIsLinkClicked={setIsLinkClicked}/>
            </div>
            <Footer />
        </motion.div>
    </>
  )
}
