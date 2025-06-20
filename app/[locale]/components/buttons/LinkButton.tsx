import Link from "next/link";

interface LinkButtonProps {
    text: string,
    className?: string,
    href: string,
    targetBlank?: boolean 
}

export default function LinkButton({ text, className, href, targetBlank = false }: LinkButtonProps) {
  
  return (
    <div className={`relative ${className}`}>
        <div className="relative h-6 lg:h-8 group">
            <Link target={targetBlank ? "_blank" : "_self"} href={href} className={`text-white dark:text-black text-base lg:text-2xl`}>{text}</Link>
            <div className={`bottom-[-0.125rem] h-[1px] duration-500 group-hover:scale-x-0 origin-right transition-transform left-0 right-0 bg-white dark:bg-black absolute`}/>
        </div>
    </div>
  )
}
