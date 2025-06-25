import { useState } from "react";
import { useDropzone } from "react-dropzone";
// import BracketButton from "../../buttons/BracketButton";
import { generateUplaodLinks, updatePhotosetImages } from "@/app/[locale]/actions/imageActions";
import { Photoset } from "@prisma/client";
import NotInHeaderButton from "../../buttons/NotInHeaderButton";

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

    const handleUpload = async (files: File[]) => {
        try {
            setIsUploading(true);

            const linksRes = await generateUplaodLinks({
                nrOfImages: files.length,
                photosetId: photoset.id
            });

            if (!linksRes.success) return;

            const filenames = [];
            
            for (let i = 0; i < linksRes.links.length; i++) {
                // Convert base64 to Buffer
                const base64String = await convertToBase64(files[i]);
                const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
                const buf = Buffer.from(base64Data, 'base64');

                // Upload to S3
                const response = await fetch(linksRes.links[i], {
                    method: 'PUT',
                    body: buf
                });

                 // Extract key from URL
                 const extractedKey = linksRes.links[i].split('.com/')[1]?.split('?')[0];
    
                 if (response.ok && extractedKey) {
                    filenames.push(extractedKey);
                 } else {
                     console.error(`Failed to upload image ${i+1}`);
                 }
            }

            const updatePhotosetImagesRes = await updatePhotosetImages({
                filenames,
                id: photoset.id
             })

             if (updatePhotosetImagesRes.success) {
                setPhotoset({
                    ...photoset,
                    images: updatePhotosetImagesRes.images
                })
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
            if (acceptedFiles) {
                await handleUpload(acceptedFiles);
            }
        }
    });

    return (
        <div className="border border-black dark:border-white border-dashed rounded-[0.25rem] flex-1 group hover:opacity-50 transition duration-200">
            <div {...getRootProps({className: 'dropzone'})} className={`h-full w-full flex justify-center items-center ${isUploading ? "hover:cursor-default" : "hover:cursor-pointer"}`}>
                <input {...getInputProps()} className="w-full h-full" disabled={isUploading} />
                <NotInHeaderButton 
                    color={{ light: 'black', dark: 'white' }}
                    disabled={isUploading} 
                    className='w-[3.2rem] lg:w-[10.2rem]' 
                    text={isUploading ? 'SE ÎNCARCĂ...' : 'ADAUGĂ POZĂ'}
                />
            </div>
        </div>
    );
}