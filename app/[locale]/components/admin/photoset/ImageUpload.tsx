import { useState } from "react";
import { useDropzone } from "react-dropzone";
import BracketButton from "../../buttons/BracketButton";
import { imageUpload } from "@/app/[locale]/actions/imageActions";
import { Photoset } from "@prisma/client";

interface ImageUploadProps {
    photoset: Photoset
    setPhotoset: (photoset: Photoset) => void
}

export default function ImageUpload({
    photoset,
    setPhotoset
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleUpload = async (file: File) => {
        try {
            setIsUploading(true);
            const base64String = await convertToBase64(file);
            
            const result = await imageUpload({
                image: base64String,
                photosetId: photoset.id,
            });

            if (result.success) {
                setPhotoset({
                  ...photoset,
                  images: [...photoset.images, result.imageUrl]
                })
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                await handleUpload(file);
            }
        }
    });

    return (
        <div className="border border-black dark:border-white border-dashed rounded-lg flex-1 group hover:opacity-50 transition duration-200">
            <div {...getRootProps({className: 'dropzone'})} className={`h-full w-full flex justify-center items-center ${isUploading ? "hover:cursor-default" : "hover:cursor-pointer"}`}>
                <input {...getInputProps()} className="w-full h-full" disabled={isUploading} />
                <BracketButton 
                    color="text-black dark:text-white" 
                    disabled={isUploading} 
                    className='w-[3.2rem] lg:w-[10.2rem]' 
                    text={isUploading ? 'SE ÎNCARCĂ...' : 'ADAUGĂ POZĂ'}
                />
            </div>
        </div>
    );
}