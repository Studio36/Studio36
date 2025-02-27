'use client'

import Image from "next/image"
import Link from "../buttons/Link"

interface ProjectItemLinkProps {
    image: string,
    title: string,
    id: string,
    setIsActive: (isActive: boolean) => void,
    setIsLinkClicked: (isLinkClicked: boolean) => void
}

export default function ProjectItemLink({ image, title, id, setIsActive, setIsLinkClicked }: ProjectItemLinkProps) {
  return (
    <Link setIsLinkClicked={setIsLinkClicked} href="/photoset/[id]" id={id} className='rounded-[0.25rem] lg:rounded-lg max-h-[45rem] w-full overflow-hidden block' onMouseEnter={() => {setIsActive(true)}} onMouseLeave={() => {setIsActive(false)}}>
        <Image src={image} alt={title} width={1000} height={1500} className='w-full object-cover transition duration-500 hover:scale-110'/>
    </Link>
  )
}
