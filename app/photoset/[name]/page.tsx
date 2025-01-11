'use client'

import CustomCursour from "@/app/components/CustomCursour"
import Gallery from "@/app/components/photoset/Gallery"
import MobileGallery from "@/app/components/photoset/MobileGallery"
import NextProjectScreen from "@/app/components/photoset/NextProjectScreen"
import SetDescription from "@/app/components/photoset/SetDescription"
import { responsiveMax } from "@/app/lib/utils"
import { useEffect, useState } from "react"

export default function Photoset() {
    const [gridLayout, setGridLayout] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < responsiveMax);
      };
      
      // Initial check
      checkMobile();
      
      // Add resize listener
      window.addEventListener('resize', checkMobile);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
  
    if (isMobile === null) return null;

  return (
    <>
      <CustomCursour isActive={false}/>
      <div className="col-span-3 lg:col-span-8 layout-grid">
        <div className="layout-grid col-span-3 lg:col-span-8 mt-12 relative min-h-[calc(100vh-11.875rem)]">
            <SetDescription gridLayout={gridLayout} setGridLayout={setGridLayout}/>
            {isMobile ? <MobileGallery /> : <Gallery gridLayout={gridLayout}/>}
        </div>
        <NextProjectScreen isMobile={isMobile}/>
      </div>
    </>
  )
}