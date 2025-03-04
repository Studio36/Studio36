import { Photoset } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import DeleteConfirmationCard from "./DeleteConfirmationCard";
import Image from "next/image";
import BracketButton from "../buttons/BracketButton";
import { useRouter } from "next/navigation";
import { deletePhotoset } from "../../actions/photosetActions";
import { AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";

interface ProjectCardProps {
    photoset: Photoset,
}

export default function ProjectCard({photoset}: ProjectCardProps) {
const t = useTranslations("projects.services");
const [deleteConfirmation, setDeleteConfirmation] = useState(false);
const router = useRouter();
const lenis = useLenis();

const onDeleteClick = async () => {
    const res = await deletePhotoset(photoset.id);

    if (!res.success) {
        console.error(res.error);
        return;
    }

    setDeleteConfirmation(false);
}

useEffect(() => {
    if (deleteConfirmation) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
}, [deleteConfirmation]);


return(
    <>
    <AnimatePresence>
        {deleteConfirmation && <DeleteConfirmationCard onDelete={onDeleteClick} setOpen={setDeleteConfirmation}/>}
    </AnimatePresence>
    <div className='col-span-2 pr-6 z-10'>
        {photoset.images.length > 0 ? <Image src={photoset.images[0]} width={1000} height={1500} alt={photoset.title} className='rounded-lg'/> : <div className='w-full h-96 flex justify-center items-center border border-black border-dashed rounded-lg '>No Photos Added</div>}
        <div className='mt-4'>
        <h2 className='text-2xl font-hedwig'>{photoset.title}</h2>
        <div className="flex justify-between">
            <p>{t(photoset.service)}</p>
            <div className="flex gap-1">
            <BracketButton color="text-black dark:text-white" bracketDistance="-0.5rem" height='h-5' textSize='text-base' disabled={false} className='w-[3.2rem] lg:w-[4.8rem]' onClick={() => router.push(`admin/photoset/${photoset.id}`)} text='MODIFICĂ'/>
            <BracketButton color="text-red dark:text-red" bracketDistance="-0.5rem" height='h-5' textSize='text-base' disabled={false} className='w-[3.2rem] lg:w-[3.6rem]' onClick={() => {setDeleteConfirmation(true)}} text='ȘTERGE'/>
            </div>
        </div>
        </div>
    </div>
    </>
)
}
