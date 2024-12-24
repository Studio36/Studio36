'use client'

import { useState } from "react";
import ParallaxImage from "../../ParallaxImage";
import ArrowAnimation from "./ArrowAnimation";
import Image from "next/image";

interface ServicesRowProps {
    service1: string,
    service2: string,
    image1: string,
    image2: string,
    className?: string,
    setIsActive: (isActive: boolean) => void,
}

export const ServicesRow: React.FC<ServicesRowProps> = ({ service1, service2, image1, image2, className, setIsActive }) => {
    return (
        <div className={`flex flex-col gap-4 lg:flex-row col-span-6 ${className}`}>
            <Card image={image1} service={service1} setIsActive={setIsActive}/>
            <Card image={image2} service={service2} right setIsActive={setIsActive}/>
        </div>
    );
}

interface CardProps {
    image: string,
    service: string,
    right?: boolean,
    setIsActive: (isActive: boolean) => void
}

const Card: React.FC<CardProps> = ({ image, service, right, setIsActive }) => {
    const [animate, setAnimate] = useState(false);

    return (
            <div onMouseEnter={() => {setAnimate(true); setIsActive(true)}} onMouseLeave={() => {setAnimate(false); setIsActive(false)}} className={`relative h-[16.5rem] lg:h-[25rem] group transition-all duration-500 hover:cursor-pointer ${right ? "lg:w-1/2 lg:ml-6 lg:hover:w-2/3 lg:peer-hover:w-1/3" : "lg:flex-1 peer"}`}>
                <ParallaxImage src={image} alt="service" className="rounded-lg h-full w-full object-cover"/>
                <div className="flex absolute left-4 lg:left-8 top-4 lg:top-5 gap-3 w-[calc(100%-4rem)]">
                    <h3 className="mix-blend-difference text-purewhite text-xl lg:text-2xl">{service}</h3>
                    <ArrowAnimation animate={animate} />
                </div>
                <Image src="/icons/arrow-right.svg" width={22} height={22} alt="right arrow" className="lg:hidden absolute right-4 bottom-4 size-[1.375rem] mix-blend-difference -rotate-45" color="#fff" />
            </div>
    )
}