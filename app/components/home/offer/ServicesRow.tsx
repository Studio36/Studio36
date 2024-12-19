'use client'

import { useState } from "react";
import ParallaxImage from "../../ParallaxImage";
import ArrowAnimation from "./ArrowAnimation";
import {motion} from 'motion/react'

interface ServicesRowProps {
    service1: string,
    service2: string,
    image1: string,
    image2: string,
    className?: string
}

export const ServicesRow: React.FC<ServicesRowProps> = ({ service1, service2, image1, image2, className }) => {
    return (
        <div className={`flex col-span-6 ${className}`}>
            <Card image={image1} service={service1}/>
            <Card image={image2} service={service2} right/>
        </div>
    );
}

interface CardProps {
    image: string;
    service: string;
    right?: boolean;
}

const Card: React.FC<CardProps> = ({ image, service, right }) => {
    const [animate, setAnimate] = useState(false)

    return (
            <div onMouseEnter={() => {setAnimate(true)}} onMouseLeave={() => {setAnimate(false)}} className={`relative h-[25rem] group transition-all duration-500 ${right ? "w-1/2 ml-6 hover:w-2/3 peer-hover:w-1/3" : "flex-1 peer"}`}>
                <ParallaxImage src={image} alt="service" className="rounded-lg h-full w-full object-cover"/>
                <div className="flex absolute left-8 top-5 gap-3 w-[calc(100%-4rem)]">
                    <h3 className="mix-blend-difference text-purewhite text-2xl">{service}</h3>
                    <ArrowAnimation animate={animate} />
                </div>
            </div>
    )
}