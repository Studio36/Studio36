import React, { useState } from 'react'
import BracketButton from '../../buttons/BracketButton'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Photoset, Service } from '@prisma/client'
import { updatePhotosetData } from '@/app/[locale]/actions/photosetActions'
import { useTranslations } from 'next-intl'

interface InfoFormProps {
  photoset: Photoset
}

export default function InfoForm({photoset}: InfoFormProps) {
  const [title, setTitle] = useState(photoset.title);
  const [description, setDescription] = useState(photoset.description);
  const [info, setInfo] = useState(photoset.additional_info);
  const [service, setService] = useState(photoset.service);
  const [hasChanged, setHasChanged] = useState(false);
  const t = useTranslations("projects.services");

  const updatePhotosetInfo = async () => {
    setHasChanged(false)

    const res = await updatePhotosetData({
      id: photoset.id,
      title,
      description,
      info,
      service
    })
    
    if (!res.success) {
      console.error(res.error)
    } 
  }

  return (
    <div className='col-start-2 mt-12 pr-6'>
        <BracketButton color="text-black dark:text-white" bracketDistance="-0.5rem" height='h-5' textSize='text-base' disabled={!hasChanged} className='w-[3.2rem] lg:w-[4.8rem]' onClick={updatePhotosetInfo} text='MODIFICĂ'/>
        <Input className='my-5' placeholder='Titlu' value={title} onChange={(e) => {setHasChanged(true); setTitle(e.currentTarget.value)}} />
        <p>[DESCRIERE]</p>
        <Textarea className='mt-2' placeholder='Descrierea proiectului...' value={description} onChange={(e) => {setHasChanged(true); setDescription(e.currentTarget.value)}}/>
        <p className='mt-4'>[INFO]</p>
        <Textarea className='mt-2' placeholder='Detalii despre proiect...' value={info} onChange={(e) => {setHasChanged(true); setInfo(e.currentTarget.value)}}/>
        <p className='mt-4 mb-2'>[SERVICIU]</p>
        <Select value={service}
          onValueChange={(value) => {
              setHasChanged(true);
              setService(value as Service);
          }}
        >
          <SelectTrigger className="max-w-[250px]">
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
    </div>
  )
}
