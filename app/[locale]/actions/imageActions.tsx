'use server' 
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

interface ImageUploadParams {
  image: string;        // base64 string or empty
  photosetId: string;   // Prisma Photoset ID
}

interface ImageUploadResult {
  success: boolean;
  imageUrl: string;
  error?: string;
}

export const imageUpload = async ({
  image,
  photosetId,
}: ImageUploadParams): Promise<ImageUploadResult> => {
  try {
    const awsAccessKey = process.env.AWS_ACCESS_KEY;

    const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!awsAccessKey || !awsSecretAccessKey) {
      return { 
        success: false, 
        imageUrl: '', 
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

    // Handle empty image case
    if (image === "") {
      return { 
        success: false, 
        imageUrl: '', 
        error: 'No image provided' 
      };
    }

    // Upload new image
    const data = image.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(data, 'base64');
    const hash = crypto.randomBytes(4).toString('hex');
    const fileName = `photosets/${photosetId}/${hash}.png`;

    await s3.send(new PutObjectCommand({
      Bucket: 'studio36',
      Key: fileName,
      Body: buf,
    }));

    const newImageUrl = `https://d3le09nbvee0zx.cloudfront.net/${fileName}`;

    // Update photoset with new image URL
    await prisma.photoset.update({
      where: {
        id: photosetId
      },
      data: {
        images: {
          push: newImageUrl 
        }
      }
    });

    return { 
      success: true, 
      imageUrl: newImageUrl 
    };
  
  } catch (error: any) {
    return {
      success: false,
      imageUrl: '',
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
    const awsAccessKey = process.env.AWS_ACCESS_KEY;

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