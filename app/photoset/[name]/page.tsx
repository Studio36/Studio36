'use client'

import CustomCursour from "@/app/components/CustomCursour"
import Gallery from "@/app/components/photoset/Gallery"
import MobileGallery from "@/app/components/photoset/MobileGallery"
import NextProjectScreen from "@/app/components/photoset/NextProjectScreen"
import SetDescription from "@/app/components/photoset/SetDescription"
import { photosets, responsiveMax } from "@/app/lib/utils"
import Head from "next/head"
import { useEffect, useState } from "react"

export default function Photoset({params}: {params: Promise<{ name: string }>}) {
    const [gridLayout, setGridLayout] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);  
    const [images, setImages] = useState<string[] | null>(null);
    const [currentPhotoset, setCurrentPhotoset] = useState<number>(0);

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
      
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
      if (isMobile === true) setIsLoaded(true);
    }, [isMobile])
  
  return (
    <>
    <Head>
      <link
        rel="preload"
        href={`/photoset/${photosets[currentPhotoset][0]}`}
        as="image"
      />
    </Head>
      <CustomCursour isActive={false}/>
      <div className="col-span-3 lg:col-span-8 layout-grid min-h-[101vh]">
        <div className="flex flex-col col-span-3 lg:col-span-8 mt-12 relative min-h-[calc(100vh-11.875rem)]">
          <div className="layout-grid w-full relative">
            {isMobile !== null && isLoaded && <SetDescription gridLayout={gridLayout} isMobile={isMobile} setGridLayout={setGridLayout}/>}
            {isMobile === null || images === null ? <></> : isMobile ? <MobileGallery images={images} /> : <Gallery isLoaded={isLoaded} gridLayout={gridLayout} images={images} setIsLoaded={setIsLoaded}/>}
          </div>
        </div>
        {isMobile !== null && isLoaded && <NextProjectScreen isMobile={isMobile} nextPhotoset={Math.abs(currentPhotoset - 1)}/>}
      </div>
    </>
  )
}