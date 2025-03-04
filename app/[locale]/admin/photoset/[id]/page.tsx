'use client'

import React, { useEffect, useState } from 'react'
import { getPhotoset } from '@/app/[locale]/actions/photosetActions';
import { Photoset } from '@prisma/client';
import InfoForm from '@/app/[locale]/components/admin/photoset/InfoForm';
import AdminNavbar from '@/app/[locale]/components/admin/AdminNavbar';
import ImageGrid from '@/app/[locale]/components/admin/photoset/ImageGrid';
import { motion } from 'motion/react';
import { easeInOutCubic } from '@/app/[locale]/lib/utils';
import VerticalLines from '@/app/[locale]/components/VerticalLines';

export default function AdminPhotoset({params}: {params: Promise<{ id: string }>}) {
    const [photoset, setPhotoset] = useState<Photoset | null>(null);
    const [isLinkClicked, setIsLinkClicked] = useState(false);

    useEffect(() => {
        const getPhotosetById = async () => {
            const id = (await params).id;
            const photoset = await getPhotoset(id);
            setPhotoset(photoset);
        }
    
        getPhotosetById();
    }, [params]);

    if (photoset == null) {
      return;
    }

  return (
    <motion.div initial={'initial'} variants={{initial: {opacity: 0}, animate: {opacity: 100 }}} animate={isLinkClicked ? 'initial' : 'animate'} transition={{duration: 0.7, ease: easeInOutCubic}} className="col-span-8 min-h-screen [&>*]:z-[2] flex-1 z-[100] bg-white dark:bg-black transition-colors duration-200">
      <VerticalLines />
      <div className='layout-grid col-span-8 pb-24'>
          <AdminNavbar setIsLinkClicked={setIsLinkClicked}/>
          <InfoForm photoset={photoset}/>
          <ImageGrid images={photoset.images} photoset={photoset} setPhotoset={setPhotoset}/>
          <div className='flex-1'></div>
      </div>
    </motion.div>
  )
}
