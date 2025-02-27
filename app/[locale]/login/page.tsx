'use client'
/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { useState } from 'react'
import AdminNavbar from '../components/admin/AdminNavbar';
import Image from 'next/image';
import { motion } from 'motion/react';
import { easeInOutCubic } from '../lib/utils';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import BracketButton from '../components/buttons/BracketButton';

export default function AdminPage() {
  const [isLinkClicked, setIsLinkClicked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const logIn = async () => {
    const response: any = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });

    if(response.ok) {
      router.push('/admin')
    }
  }

  return (
    <div className='col-span-8 min-h-screen flex flex-col'>
      <AdminNavbar setIsLinkClicked={setIsLinkClicked}/>
      <motion.div initial={'initial'} variants={{initial: {opacity: 0}, animate: {opacity: 100 }}} animate={isLinkClicked ? 'initial' : 'animate'} transition={{duration: 0.7, ease: easeInOutCubic}} className="layout-grid col-span-8 [&>*]:z-[2] flex-1 z-[100]">
        <div className='absolute right-0 h-full w-[64.24%] top-0'>
          <Image src='/hero-stages/stage1.jpg' alt='logo' width={1000} height={1500} className='w-full h-full object-cover'/>
        </div>
        <form onSubmit={(e) => {e.preventDefault(); logIn();}} className='mt-24 col-start-2'>
          <p className='text-2xl'>[USERNAME]</p>
          <Input placeholder='Username' className='mt-2 mb-6' value={username} onChange={(e) => {setUsername(e.currentTarget.value)}}/>
          <p className='text-2xl'>[PASSWORD]</p>
          <Input placeholder='Password' className='mt-2 mb-12' value={password} onChange={(e) => {setPassword(e.currentTarget.value)}}/>
          <BracketButton color="text-black" disabled={false} className='w-[3.6rem] lg:w-[4.8rem]' onClick={() => {}} text='LOG IN'/>
        </form>
      </motion.div>
    </div>
  )
}
