import React from 'react'
import ImageUpload from './ImageUpload'
import { Photoset } from '@prisma/client';
import { deleteImage } from '@/app/[locale]/actions/imageActions';
import PhotosetImage from './PhotosetImage';

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
          return (
            <PhotosetImage key={index} image={image} onDeleteClick={() => {onDeleteClick(image)}} />
          )
        })
      }
    </div>
  )
}