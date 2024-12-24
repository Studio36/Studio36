import Link from "next/link";

interface LinkButtonProps {
    text: string,
    className?: string,
    href: string,
}

export default function LinkButton({ text, className, href }: LinkButtonProps) {
  
  return (
    <div className={`relative ${className}`}>
        <div className="relative h-6 lg:h-8 overflow-hidden group">
            <div className="relative transition duration-300 group-hover:-translate-y-1/2">
                <Link href={href} className={`text-white text-xl lg:text-2xl block`}>{text}</Link>
                <Link href={href} className={`text-white text-xl lg:text-2xl`}>{text}</Link>
            </div>
        </div>
    </div>
  )
}
