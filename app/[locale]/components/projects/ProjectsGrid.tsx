'use client'

import { useEffect, useState } from 'react'
import ProjectItemLink from './ProjectItemLink'
import { Photoset } from '@prisma/client'
import { getAllPhotosets } from '@/app/[locale]/actions/photosetActions'
import { useTranslations } from 'next-intl'
import { Skeleton } from "@/components/ui/skeleton"

interface ProjectsGridProps {
    setIsActive: (isActive: boolean) => void,
    setIsLinkClicked: (isLinkClicked: boolean) => void
}

export default function ProjectsGrid({ setIsActive, setIsLinkClicked }: ProjectsGridProps) {
    const [photosets, setPhotosets] = useState<Photoset[] | null>(null);
    const t = useTranslations("projects.services");

    useEffect(() => {
        const getPhotosets = async () => {
            const photosets = await getAllPhotosets();
            setPhotosets(photosets);
        }

        getPhotosets();
    }, []);

  return (
      <div className='grid grid-cols-3 lg:grid-cols-6 col-span-6 gap-y-4 lg:gap-y-12 lg:[&>*:not(:nth-child(3n))]:pr-6'>
      {
            photosets ?
          photosets.map((photoset, index) => {
                return (
                    <div className='flex flex-col col-span-3 lg:col-span-2' key={index}>
                        <div>
                            <ProjectItemLink image={photoset.images[0]} title={photoset.title} id={photoset.id} setIsActive={setIsActive} setIsLinkClicked={setIsLinkClicked}/>
                            <p className='text-xl lg:text-2xl font-hedwig mt-1 lg:mt-4'>{photoset.title}</p>
                            <p className='text-sm lg:text-base'>{t(photoset.service)}</p>
                        </div>
                    </div>
                )
            }) :
        <>
            <div className='col-span-2'>
                <Skeleton className='aspect-[0.67] mr-6 mb-4'/>     
                <Skeleton className='w-40 h-8 mb-1'/>     
                <Skeleton className='w-72 h-6'/>      
            </div> 
            <div className='col-span-2'>
                <Skeleton className='aspect-[0.67] mr-6 mb-4'/>     
                <Skeleton className='w-40 h-8 mb-1'/>     
                <Skeleton className='w-72 h-6'/>      
            </div> 
            <div className='col-span-2'>
                <Skeleton className='aspect-[0.67] mr-6 mb-4'/>     
                <Skeleton className='w-40 h-8 mb-1'/>     
                <Skeleton className='w-72 h-6'/>      
            </div> 
        </>
        }
    </div >
  )
}
