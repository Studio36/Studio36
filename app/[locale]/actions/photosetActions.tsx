'use server' 
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma";
import { Photoset, Service } from "@prisma/client";

export async function createPhotoset() {

    const newPhotoset = await prisma.photoset.create({
        data: {
            title: "Titlu",
            description: "Descriere",
            additional_info: "Informatie aditionala",
            service: Service.PERSONAL_PHOTO,
            images: []
        }

    });

    return newPhotoset;
}

export async function getAllPhotosets(): Promise<Photoset[]> {
    const photosets = await prisma.photoset.findMany({});

    return photosets;
}

export async function getPhotosetCount(): Promise<{ photosets: number }> {
    const count = await prisma.photoset.count();
    return { photosets: count };
}

export async function getPhotoset(id: string): Promise<Photoset | null> {
    const photoset = await prisma.photoset.findUnique({
        where: {
            id: id
        }
    });

    return photoset;
}

interface UpdatePhotosetProps {
    id: string,
    title: string,
    description: string,
    info: string,
    service: Service
}

interface UpdatePhotosetResult {
    success: boolean;
    error?: string;
  }

export async function updatePhotosetData({id, title, description, info, service}: UpdatePhotosetProps): Promise<UpdatePhotosetResult> {
    try {
        await prisma.photoset.update({
            where: {
                id: id
            },
            data: {
                title: title,
                description: description,
                additional_info: info,
                service: service
            }
        })

        return {
            success: true,
        }

    } catch (e: any) {
        return {
            success: false,
            error: e
        }
    }
}

export async function deletePhotoset(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        await prisma.photoset.delete({
            where: {
                id: id
            }
        });

        return {
            success: true
        };

    } catch (e: any) {
        return {
            success: false,
            error: e.message
        };
    }
}