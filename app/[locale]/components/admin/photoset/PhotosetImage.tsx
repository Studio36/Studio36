import { AnimatePresence } from 'motion/react'
import React, { useEffect, useState } from 'react'
import DeleteConfirmationCard from '../DeleteConfirmationCard';
import Image from 'next/image';
import { useLenis } from 'lenis/react';

interface PhotosetImageProps {
    onDeleteClick: () => void,
    image: string
}

export default function PhotosetImage({onDeleteClick, image}: PhotosetImageProps) {
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
                {deleteConfirmation && <DeleteConfirmationCard onDelete={onDeleteClick} setOpen={setDeleteConfirmation}/>}
            </AnimatePresence>  
            <div className='pr-6 cursor-pointer relative group' onClick={() => {setDeleteConfirmation(true)}}>
                <div className='absolute pointer-events-none left-0 top-0 w-full h-full bg-white bg-opacity-25 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-200'>
                    <button className='text-red text-2xl'>[ȘTERGE]</button>
                </div>
                <Image src={image} alt='image' width={1000} height={1500} className='rounded-[0.25rem] h-full object-cover' />
            </div>
        </>
    )
}
