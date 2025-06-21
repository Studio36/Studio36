interface BracketButtonProps {
    text: string,
    className?: string,
    disabled?: boolean,
    onClick?: () => void,
    disabledStyle?: boolean,
    brackets?: boolean,
    isInHeader?: boolean,
    color?: string,
    textSize?: string,
    height?: string,
    bracketDistance?: string   
}

export default function BracketButton({ className, disabled, onClick, text, disabledStyle = true, brackets = true, isInHeader = false, color = "text-white", textSize = "text-xl lg:text-2xl" }: BracketButtonProps) {
  
  return (
    <div className={`hover:opacity-75 transition-opacity duration-500 relative ${brackets ? "mx-3" : ""} ${disabled ? "" : "cursor-pointer group"} ${className}`} onClick={() => {if (!disabled && onClick) onClick()}}>
        <button className={`${color} ${isInHeader ? "" : "dark:text-black"} ${textSize} ${disabledStyle ? "disabled:opacity-25" : ""}`} disabled={disabled && disabledStyle}>{text}</button>

        <div className={`bottom-[-0.125rem] h-[1px] duration-500 group-hover:scale-x-0 origin-right transition-transform left-0 right-0 ${isInHeader ? "bg-white" : "dark:bg-black bg-white"} absolute ${disabled ? "opacity-25" : "opacity-100"}`}/>
    </div>
  )
}