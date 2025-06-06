import { AnimatePresence } from 'motion/react'
import React, { useEffect, useState } from 'react'
import DeleteConfirmationCard from '../DeleteConfirmationCard';
import Image from 'next/image';
import { useLenis } from 'lenis/react';
import { Pin } from 'lucide-react';

interface PhotosetImageProps {
    onReorderToFirst: (url: string) => void,
    onDeleteClick: () => void,
    image: string,
    index: number
}

export default function PhotosetImage({onDeleteClick, onReorderToFirst, image, index}: PhotosetImageProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const lenis = useLenis();

    useEffect(() => {
        if (deleteConfirmation) {
        lenis?.stop();
        } else {
        lenis?.start();
        }
    }, [deleteConfirmation]);

    return (
        <>
            <AnimatePresence>
                {deleteConfirmation && <DeleteConfirmationCard onDelete={() => {onDeleteClick(); setDeleteConfirmation(false)}} setOpen={setDeleteConfirmation}/>}
            </AnimatePresence>  
            <div className='pr-6 relative group max-h-80'>
                <div className='absolute left-0 top-0 w-[calc(100%-1.5rem)] h-full bg-black rounded-lg opacity-0 group-hover:opacity-25 transition duration-300'></div>
                <Pin
                    fill={index === 0 ? "white" : "none"}
                    strokeWidth={1.5} 
                    className={`text-white size-5 absolute left-2 cursor-pointer top-2 opacity-0 group-hover:opacity-100 z-20 ${index === 0 ? "" : "cursor-pointer"}`}
                    onClick={() => {
                        onReorderToFirst(image)
                    }}
                />
                <div className='absolute left-0 top-0 w-full h-full bg-white bg-opacity-25 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-200'>
                    <button className='text-red text-2xl cursor-pointer' onClick={() => {setDeleteConfirmation(true)}}>[ȘTERGE]</button>
                </div>
                <Image src={image} alt='image' width={1000} height={1500} className='rounded-[0.25rem] w-full h-fit max-h-full object-cover' />
            </div>
        </>
    )
}
