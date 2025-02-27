import React from 'react'
import Link from '../buttons/Link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import BracketButton from '../buttons/BracketButton';
import { signOut } from "next-auth/react"

interface AdminNavbarProps {
  setIsLinkClicked: (isLinkClicked: boolean) => void,
}

export default function AdminNavbar({ setIsLinkClicked }: AdminNavbarProps) {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <div className={`col-span-3 lg:col-span-8 layout-grid sticky top-0 z-50 py-4 lg:py-8 mix-blend-difference h-fit`}>
        <Link href='/' setIsLinkClicked={setIsLinkClicked} className='lg:col-start-2 w-12 lg:w-16'>
            <Image src="/icons/logo.svg" alt="logo" width={64} height={78} 
            onClick={() => {setTimeout(() => {
            setIsLinkClicked(false);
            }, 1600)}}/>
        </Link>

        <p className={`text-white text-2xl col-span-2 hidden lg:block`}>Administrarea <br/> Proiectelor & Pozelor</p>
        <BracketButton isInHeader disabled={false} className='col-start-7 justify-self-end w-[5.3rem] lg:w-[6.4rem]' onClick={() => signOut()} text='LOG OUT'/>
        <button className='absolute size-4 m-2 rounded-full right-8 top-8 border-2 border-white' onClick={() => {if(resolvedTheme === 'dark') setTheme('light'); else setTheme('dark')}}>
        <div className="absolute w-1/2 h-full rounded-l-full bg-white left-0 top-0"></div>
        </button>
    </div>
  )
}
