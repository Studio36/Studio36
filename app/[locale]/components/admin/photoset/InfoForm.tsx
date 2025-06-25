import React, { useState } from 'react'
// import BracketButton from '../../buttons/BracketButton'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Photoset, Service } from '@prisma/client'
import { updatePhotosetData } from '@/app/[locale]/actions/photosetActions'
import { useTranslations } from 'next-intl'
import NotInHeaderButton from '../../buttons/NotInHeaderButton'

interface InfoFormProps {
  photoset: Photoset
}

export default function InfoForm({photoset}: InfoFormProps) {
  const [title, setTitle] = useState(photoset.title);
  const [service, setService] = useState(photoset.service);
  const [hasChanged, setHasChanged] = useState(false);
  const t = useTranslations("projects.services");

  const updatePhotosetInfo = async () => {
    setHasChanged(false)

    const res = await updatePhotosetData({
      id: photoset.id,
      title,
      service
    })
    
    if (!res.success) {
      console.error(res.error)
    } 
  }

  return (
    <div className='col-start-2 mt-12 pr-6'>
        <p className='text-base font-[400]'>TITLU PROIECT</p>
        <Input className='mt-2 bg-transparent text-[1.5rem] py-0 ring-0 outline-none' placeholder='Titlu' value={title} onChange={(e) => {setHasChanged(true); setTitle(e.currentTarget.value)}} />
        <p className='mt-[2.5rem]'>SERVICIU</p>
        <Select value={service}
          onValueChange={(value) => {
            setHasChanged(true);
            setService(value as Service);
          }}
        >
          <SelectTrigger className="w-full mt-[0.5rem] outline-none ring-0">
            <SelectValue placeholder="Serviciu" />
          </SelectTrigger>
          <SelectContent>
            {
              Object.keys(Service).map((service) => {
                return <SelectItem key={service} value={service}>{t(service)}</SelectItem>
              })
            }
          </SelectContent>
        </Select>
        <NotInHeaderButton color={{ light: 'black', dark: 'white' }} bracketDistance="-0.5rem" height='h-5' disabled={!hasChanged} className='w-fit mt-[2.5rem]' onClick={updatePhotosetInfo} text='SALVEAZĂ'/>
    </div>
  )
}
