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
        <div className="relative h-6 lg:h-8 overflow-hidden group">
            <div className="relative transition duration-300 lg:group-hover:-translate-y-1/2">
                <Link target={targetBlank ? "_blank" : "_self"} href={href} className={`text-white dark:text-black text-base lg:text-2xl block`}>{text}</Link>
                <Link target={targetBlank ? "_blank" : "_self"} href={href} className={`text-white dark:text-black text-base lg:text-2xl`}>{text}</Link>
            </div>
        </div>
    </div>
  )
}
