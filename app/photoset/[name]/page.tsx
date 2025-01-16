'use client'

import CustomCursour from "@/app/components/CustomCursour"
import Header from "@/app/components/header/Header"
import Gallery from "@/app/components/photoset/Gallery"
import MobileGallery from "@/app/components/photoset/MobileGallery"
import NextProjectScreen from "@/app/components/photoset/NextProjectScreen"
import SetDescription from "@/app/components/photoset/SetDescription"
import { easeInOutCubic, photosets, responsiveMax } from "@/app/lib/utils"
import { useLenis } from "lenis/react"
import { useEffect, useState } from "react"
import { motion } from "motion/react";

export default function Photoset({params}: {params: Promise<{ name: string }>}) {
    const [gridLayout, setGridLayout] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);  
    const [images, setImages] = useState<string[] | null>(null);
    const [currentPhotoset, setCurrentPhotoset] = useState<number>(0);
    const [isLinkClicked, setIsLinkClicked] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < responsiveMax);
      };
      
      checkMobile();

      const getImages = async () => {
        const name = (await params).name;
        const images = photosets[Number(name)];

        setCurrentPhotoset(Number(name));
        setImages(images);
      }

      getImages();
      
      window.addEventListener('resize', checkMobile);

      lenis?.scrollTo(0, {immediate: true, force: true});
      
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
      if (isMobile === true) setIsLoaded(true);
    }, [isMobile])
  
  return (
    <>
      <Header setIsLinkClicked={setIsLinkClicked} isLinkClicked={isLinkClicked}/>
      <CustomCursour isActive={false} isVisible={!isLinkClicked}/>
      <motion.div initial={false} variants={{initial: {opacity: 0}, animate: {opacity: 100}}} animate={isLinkClicked ? 'initial' : 'animate'} transition={{duration: 0.7, ease: easeInOutCubic}} className="col-span-3 lg:col-span-8 layout-grid min-h-[101vh] [&>*]:z-[2]">
        <div className="flex flex-col col-span-3 lg:col-span-8 mt-12 relative min-h-[calc(100vh-11.875rem)]">
          <div className="layout-grid w-full relative">
            {isMobile !== null && isLoaded && <SetDescription gridLayout={gridLayout} isMobile={isMobile} setGridLayout={setGridLayout}/>}
            {isMobile === null || images === null ? <></> : isMobile ? <MobileGallery images={images} /> : <Gallery isLoaded={isLoaded} gridLayout={gridLayout} images={images} setIsLoaded={setIsLoaded}/>}
          </div>
        </div>
        {isMobile !== null && isLoaded && <NextProjectScreen isMobile={isMobile} nextPhotoset={Math.abs(currentPhotoset - 1)}/>}
      </motion.div>
    </>
  )
}