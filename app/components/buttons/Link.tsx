'use client'
 
import { useRouter } from 'next/navigation'

interface LinkProps {
    children: React.ReactNode,
    className?: string,
    setIsLinkClicked: (isLinkClicked: boolean) => void,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void,
    href: string,
    delay?: number
}

export default function Link({children, className, onMouseEnter, onMouseLeave, setIsLinkClicked, href, delay = 0}: LinkProps) {
    const router = useRouter()

  return (
    <button className={className} 
        onClick={
            () => {
                setTimeout(() => {
                    setIsLinkClicked(true);
                }, delay)
                setTimeout(() => {router.push(href)}, 700 + delay)
            }
        } onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
    </button>
  )
}
