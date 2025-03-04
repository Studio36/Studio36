'use client'

import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/admin/AdminNavbar'
import { createPhotoset, getAllPhotosets } from '@/app/[locale]/actions/photosetActions';
import { Photoset } from '@prisma/client';
import BracketButton from '../components/buttons/BracketButton';
import { easeInOutCubic } from '../lib/utils';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import ProjectCard from '../components/admin/ProjectCard';

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

  return (
    <>
      <motion.div initial={false} variants={{initial: {opacity: 0}, animate: {opacity: 100}}} animate={isLinkClicked ? 'initial' : 'animate'} transition={{duration: 0.7, ease: easeInOutCubic}} className="col-span-3 lg:col-span-8 layout-grid [&>*:not(.header)]:z-[2]">
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
                <ProjectCard photoset={photoset} key={index}/>
              )
            })
          }
        </div>
      </motion.div>
    </>
  )
}