'use server' 
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface GenerateUplaodLinksParams {
  nrOfImages: number,
  photosetId: string
}

interface GenerateUplaodLinksResult {
  links: string[],
  success: boolean;
  error?: string;
}

export const generateUplaodLinks = async ({
  nrOfImages,
  photosetId
}: GenerateUplaodLinksParams): Promise<GenerateUplaodLinksResult> => {
  try {
    const awsAccessKey = process.env.AWS_PUBLIC_ACCESS_KEY;
    const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!awsAccessKey || !awsSecretAccessKey) {
      return { 
        success: false, 
        links: [], 
        error: 'AWS credentials not provided' 
      };
    }

    const s3 = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretAccessKey,
      },
    });
    
    const links: string[] = [];
      
      for (let i = 0; i < nrOfImages; i++) {
        const hash = crypto.randomBytes(4).toString('hex');
        const fileName = `photosets/${photosetId}/${hash}.png`;

        const comm = new PutObjectCommand({
        Bucket: 'studio36',
        Key: fileName,
        });

        const uploadUrl = await getSignedUrl(
        s3,
        comm,
        { expiresIn: 3600 },
        );

        if (uploadUrl) {
        links.push(uploadUrl);
        }
      }

      return {
        success: true,
        links: links,
      };
  
  } catch (error: any) {
    return {
      success: false,
      links: [],
      error: error.message
    };
  }
}

interface UpdatePhotosetImagesParams {
  id: string;
  filenames: string[];
}

interface UpdatePhotosetImagesResult {
  success: boolean;
  images: string[];
  error?: string;
}

export const updatePhotosetImages = async ({
  id,
  filenames
}: UpdatePhotosetImagesParams): Promise<UpdatePhotosetImagesResult> => {
  try {
    const newImageUrls = filenames.map(filename => `https://d3le09nbvee0zx.cloudfront.net/${filename}`);
  
    // Get current images from photoset
    const currentPhotoset = await prisma.photoset.findUnique({
      where: { id },
      select: { images: true }
    });

    const currentImages = currentPhotoset?.images || [];

    // Update photoset with new images at the beginning
    await prisma.photoset.update({
      where: { id },
      data: {
      images: [...newImageUrls, ...currentImages]
      }
    });

    return {
      success: true,
      images: [...newImageUrls, ...currentImages],
    };
  } catch (error: any) {
    return {
      success: false,
      images: [],
      error: error.message
    };
  }
};

interface ReorderImageParams {
  photosetId: string;
  imageUrls: string[];
}

interface ReorderImageResult {
  success: boolean;
  error?: string;
}

export const reorderImages = async ({
  photosetId,
  imageUrls
}: ReorderImageParams): Promise<ReorderImageResult> => {
  try {
    await prisma.photoset.update({
      where: { id: photosetId },
      data: {
        images: imageUrls
      }
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
};

interface DeleteImageParams {
    imageUrl: string;
    photosetId: string;
  }
  
  interface DeleteImageResult {
    success: boolean;
    error?: string;
  }
  
  export const deleteImage = async ({
    imageUrl,
    photosetId
  }: DeleteImageParams): Promise<DeleteImageResult> => {
    try {
    const awsAccessKey = process.env.AWS_PUBLIC_ACCESS_KEY;

    const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!awsAccessKey || !awsSecretAccessKey) {
        return { 
        success: false, 
        error: 'AWS credentials not provided' 
        };
    }

    const s3 = new S3Client({
        region: 'eu-north-1',
        credentials: {
          accessKeyId: awsAccessKey,
          secretAccessKey: awsSecretAccessKey,
        },
      });
  
      // Extract key from CloudFront URL
      const key = imageUrl.replace('https://d3le09nbvee0zx.cloudfront.net/', '');
  
      // Delete from S3
      await s3.send(new DeleteObjectCommand({
        Bucket: 'studio36',
        Key: key
      }));

      // Get photosets
      await prisma.photoset.findMany({
        select: {
            images: true
        }
      })
      
    // Get the current images array for the photoset
    const photoset = await prisma.photoset.findUnique({
    where: {
        id: photosetId
    },
    select: {
        images: true
    }
    });

    if (!photoset) {
    return {
        success: false,
        error: 'Photoset not found'
    };
    }

// Filter out the imageUrl from the images array
const updatedImages = photoset.images.filter((img: string) => img !== imageUrl);

// Update the photoset with the filtered images array
await prisma.photoset.update({
  where: {
    id: photosetId
  },
  data: {
    images: updatedImages
  }
});
  
      return { success: true };
  
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  };