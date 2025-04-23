'use client'

import CustomCursour from "@/app/[locale]/components/CustomCursour"
import Gallery from "@/app/[locale]/components/photoset/Gallery"
import MobileGallery from "@/app/[locale]/components/photoset/MobileGallery"
import NextProjectScreen from "@/app/[locale]/components/photoset/NextProjectScreen"
import SetDescription from "@/app/[locale]/components/photoset/SetDescription"
import { responsiveMax } from "@/app/[locale]/lib/utils"
import { useLenis } from "lenis/react"
import { useEffect, useState } from "react"
import { getAllPhotosets } from "@/app/[locale]/actions/photosetActions"
import { Photoset } from "@prisma/client"
import MotionWrapper from "../MotionWrapper"

interface PhotosetClientComponentProps {
    id: string
}

export default function PhotosetClientComponent({ id }: PhotosetClientComponentProps) {
    const [gridLayout, setGridLayout] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);  
    const [nextPhotoset, setNextPhotoset] = useState<Photoset | null>(null);
    const [currentPhotoset, setCurrentPhotoset] = useState<Photoset | null>(null);
    const [isLinkClicked, setIsLinkClicked] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < responsiveMax);
      };
      
      checkMobile();

      const getImages = async () => {
        const photosets = await getAllPhotosets();
        const currentPhotosetIndex = photosets.findIndex(photoset => photoset.id === id);
        const nextPhotosetIndex = currentPhotosetIndex + 1 >= photosets.length ? 0 : currentPhotosetIndex + 1;
        setNextPhotoset(photosets[nextPhotosetIndex]);
        setCurrentPhotoset(photosets[currentPhotosetIndex]);
      }

      getImages();
      
      window.addEventListener('resize', checkMobile);

      lenis?.scrollTo(0, {immediate: true, force: true});
      
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
      if (isMobile === true) setIsLoaded(true);
    }, [isMobile])
  
    if (nextPhotoset === null || currentPhotoset === null) {
      return;
    }

  return (
    <>
      <CustomCursour isActive={false} isVisible={!isLinkClicked}/>
      <MotionWrapper isLinkClicked={isLinkClicked} setIsLinkClicked={setIsLinkClicked}>
            <div className="flex flex-col col-span-3 lg:col-span-8 mt-12 relative min-h-[calc(100vh-11.875rem)]">
            <div className="layout-grid w-full relative">
                {isMobile !== null && isLoaded && <SetDescription photoset={currentPhotoset} gridLayout={gridLayout} isMobile={isMobile} setGridLayout={setGridLayout}/>}
                {isMobile === null ? <></> : isMobile ? <MobileGallery images={currentPhotoset.images} /> : <Gallery isLoaded={isLoaded} gridLayout={gridLayout} images={currentPhotoset.images} setIsLoaded={setIsLoaded}/>}
            </div>
            </div>
            {isMobile !== null && isLoaded && <NextProjectScreen setIsLinkClicked={setIsLinkClicked} isMobile={isMobile} nextPhotoset={nextPhotoset}/>}
      </MotionWrapper>
    </>
  )
}