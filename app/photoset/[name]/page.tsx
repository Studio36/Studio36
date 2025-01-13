'use client'

import CustomCursour from "@/app/components/CustomCursour"
import Gallery from "@/app/components/photoset/Gallery"
import MobileGallery from "@/app/components/photoset/MobileGallery"
import NextProjectScreen from "@/app/components/photoset/NextProjectScreen"
import SetDescription from "@/app/components/photoset/SetDescription"
import { responsiveMax } from "@/app/lib/utils"
import Head from "next/head"
import { useEffect, useState } from "react"

export default function Photoset() {
    const [gridLayout, setGridLayout] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < responsiveMax);
      };
      
      checkMobile();
      
      window.addEventListener('resize', checkMobile);
      
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
  
  return (
    <>
    <Head>
      <link
        rel="preload"
        href="/photoset/woman-1.jpg"
        as="image"
      />
    </Head>
      <CustomCursour isActive={false}/>
      <div className="col-span-3 lg:col-span-8 layout-grid min-h-[101vh]">
        <div className="flex flex-col col-span-3 lg:col-span-8 mt-12 relative min-h-[calc(100vh-11.875rem)]">
          <div className="layout-grid w-full relative">
            <SetDescription gridLayout={gridLayout} setGridLayout={setGridLayout}/>
            {isMobile === null ? <></> : isMobile ? <MobileGallery /> : <Gallery gridLayout={gridLayout}/>}
          </div>
        </div>
        {isMobile !== null && <NextProjectScreen isMobile={isMobile}/>}
      </div>
    </>
  )
}