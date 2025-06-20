'use client'
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";

interface LinkButtonProps {
    text: string,
    className?: string,
    href: any,
    locale: string
}

export default function SwitchLang({ text, className, href, locale }: LinkButtonProps) {
  const params = useParams<{id: string}>();
  
  return (
    <div className={`relative ${className}`}>
        <div className="relative h-6 lg:h-8 group">
            <Link href={{
              pathname: href,
              params: params
            }} locale={locale} className={`text-white dark:text-black text-xl lg:text-2xl`}>{text}</Link>
        <div className={`bottom-[-0.125rem] h-[1px] duration-500 group-hover:scale-x-0 origin-right transition-transform left-0 right-0 bg-white dark:bg-black absolute`}/>
        </div>
    </div>
  )
}
