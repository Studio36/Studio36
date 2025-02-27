import Image from 'next/image'
import React from 'react'
import ImageUpload from './ImageUpload'
import { Photoset } from '@prisma/client';
import { deleteImage } from '@/app/[locale]/actions/imageActions';

interface ImageGridProps {
  images: string[],
  photoset: Photoset,
  setPhotoset: (photoset: Photoset) => void
}

export default function ImageGrid({images, photoset, setPhotoset}: ImageGridProps) {

  const onDeleteClick = async (imageUrl: string) => {
    const res = await deleteImage({
      imageUrl, 
      photosetId: photoset.id
    });

    if (res.success) {
      setPhotoset({
        ...photoset,
        images: photoset.images.filter(image => image !== imageUrl)
      })
  } else {
      console.error(res.error);
  }
  }

  return (
    <div className='grid grid-cols-5 col-start-3 col-span-5 gap-y-6 mt-12'>
      <div className='pr-6 flex flex-col'>
      <ImageUpload photoset={photoset} setPhotoset={setPhotoset}/>
      </div>
      {
        images.map((image, index) => {
          return <div key={index} className='pr-6 cursor-pointer relative group' onClick={() => {onDeleteClick(image)}}>
            <div className='absolute pointer-events-none left-0 top-0 w-full h-full bg-white bg-opacity-25 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-200'>
              <button className='text-red text-2xl'>[ȘTERGE]</button>
            </div>
            <Image src={image} alt='image' width={1000} height={1500} className='rounded-[0.25rem] h-full object-cover' />
          </div>
        })
      }
    </div>
  )
}