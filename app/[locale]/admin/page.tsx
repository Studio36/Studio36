'use client'

import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/admin/AdminNavbar'
import { createPhotoset, deletePhotoset, getAllPhotosets } from '@/app/[locale]/actions/photosetActions';
import { Photoset } from '@prisma/client';
import Image from 'next/image';
import BracketButton from '../components/buttons/BracketButton';
import { easeInOutCubic } from '../lib/utils';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function AdminPage() {
  const [isLinkClicked, setIsLinkClicked] = useState(false);
  const [photosets, setPhotosets] = useState<Photoset[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getPhotosets = async () => {
      const data = await getAllPhotosets();
      setPhotosets(data);
    }

    getPhotosets();
  }, [])

  const createNewPhotoset = async () => {
    const newPhotoset = await createPhotoset();
    router.push(`/admin/photoset/${newPhotoset.id}`)
  }

  const deleteSelectedPhotoset = async (photosetId: string) => {
    const res = await deletePhotoset(photosetId);

    if (res.success) {
      setPhotosets(photosets.filter(photoset => photoset.id !== photosetId));
    } else {
      console.error(res.error);
    }
  }

  return (
    <motion.div initial={false} variants={{initial: {opacity: 0}, animate: {opacity: 100}}} animate={isLinkClicked ? 'initial' : 'animate'} transition={{duration: 0.7, ease: easeInOutCubic}} className="col-span-3 lg:col-span-8 layout-grid [&>*]:z-[2]">
      <AdminNavbar setIsLinkClicked={setIsLinkClicked}/>
      <div className='col-start-2 col-span-6 grid grid-cols-6 pb-[7.75rem] mt-24'>
        <div className='col-span-2 pr-6 flex flex-col'>
          <div className='flex justify-center items-center border border-black dark:border-white border-dashed rounded-lg flex-1 hover:cursor-pointer group hover:opacity-50 transition duration-200' onClick={createNewPhotoset}>
            <BracketButton color="text-black dark:text-white" disabled={false} className='w-[3.2rem] lg:w-[12.5rem]' text='ADAUGĂ PROIECT'/>
          </div>
          <div className='mt-4'>
            <h2 className='text-2xl font-hedwig'>Titlul Proiectului</h2>
            <p>Tipul Serviciului Prestat</p>
          </div>
        </div>
        {
          photosets.map((photoset, index) => {
            return (
              <Card router={router} photoset={photoset} key={index} deleteSelectedPhotoset={deleteSelectedPhotoset}/>
            )
          })
        }
      </div>
    </motion.div>
  )
}

const Card = ({photoset, router, deleteSelectedPhotoset}: {photoset: Photoset, router: AppRouterInstance, deleteSelectedPhotoset: (id: string) => void}) => {
  const t = useTranslations("projects.services");

  return(
    <div className='col-span-2 pr-6 z-10'>
      {photoset.images.length > 0 ? <Image src={photoset.images[0]} width={1000} height={1500} alt={photoset.title} className='rounded-lg'/> : <div className='w-full h-96 flex justify-center items-center border border-black border-dashed rounded-lg '>No Photos Added</div>}
      <div className='mt-4'>
        <h2 className='text-2xl font-hedwig'>{photoset.title}</h2>
        <div className="flex justify-between">
          <p>{t(photoset.service)}</p>
          <div className="flex gap-1">
            <BracketButton color="text-black dark:text-white" bracketDistance="-0.5rem" height='h-5' textSize='text-base' disabled={false} className='w-[3.2rem] lg:w-[4.8rem]' onClick={() => router.push(`admin/photoset/${photoset.id}`)} text='MODIFICĂ'/>
            <BracketButton color="text-red dark:text-red" bracketDistance="-0.5rem" height='h-5' textSize='text-base' disabled={false} className='w-[3.2rem] lg:w-[3.6rem]' onClick={() => {deleteSelectedPhotoset(photoset.id)}} text='ȘTERGE'/>
          </div>
        </div>
      </div>
    </div>
  )
}