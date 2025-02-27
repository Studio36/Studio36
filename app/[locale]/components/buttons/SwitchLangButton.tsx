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
        <div className="relative h-6 lg:h-8 overflow-hidden group">
            <div className="relative transition duration-300 lg:group-hover:-translate-y-1/2">
                <Link href={{
                  pathname: href,
                  params: params
                }} locale={locale} className={`text-white dark:text-black text-xl lg:text-2xl block`}>{text}</Link>
                <Link href={{
                  pathname: href,
                  params: params
                }} locale={locale} className={`text-white dark:text-black text-xl lg:text-2xl`}>{text}</Link>
            </div>
        </div>
    </div>
  )
}
