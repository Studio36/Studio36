'use client'
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useRouter } from "@/i18n/routing"
 
interface LinkProps {
    children: React.ReactNode,
    className?: string,
    setIsLinkClicked: (isLinkClicked: boolean) => void,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void,
    href: any,
    id?: any,
    section?: string,
    delay?: number
}

export default function Link({children, className, onMouseEnter, onMouseLeave, setIsLinkClicked, href, delay = 0, section, id}: LinkProps) {
    const router = useRouter()

  return (
    <button className={className} 
        onClick={
            () => {
                router.prefetch({
                    pathname: href,
                    query: !section ? {} : {section},
                    params: !id ? {id: ''} : {id: id}
                })
                setTimeout(() => {
                    setIsLinkClicked(true);
                }, delay)
                setTimeout(() => {
                    console.log(id);
                    router.push({
                        pathname: href,
                        query: !section ? {} : {section},
                        params: !id ? {id: ''} : {id: id}
                    })
                    localStorage.setItem('lastClickedLinkTime', Date.now().toString())
                }, 700 + delay)
            }
        } onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
    </button>
  )
}
