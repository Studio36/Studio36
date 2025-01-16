interface BracketButtonProps {
    text: string,
    className?: string,
    disabled?: boolean,
    onClick: () => void,
    disabledStyle?: boolean,
    brackets?: boolean,
    isInHeader?: boolean,
}

export default function BracketButton({ className, disabled, onClick, text, disabledStyle = true, brackets = true, isInHeader = false }: BracketButtonProps) {
  
  return (
    <div className={`relative ${brackets ? "mx-3" : ""} ${disabled ? "" : "cursor-pointer group"} ${className}`} onClick={() => {if (!disabled) onClick()}}>
        {brackets && <span className={`absolute -left-3 top-0 text-white ${isInHeader ? "" : "dark:text-black"} text-xl lg:text-2xl ${disabled && disabledStyle ? 'opacity-25' : ''}`}>[</span>}
        <div className="relative h-6 lg:h-8 overflow-hidden">
            <div className="absolute left-0 top-0 w-full transition duration-300 lg:group-hover:-translate-y-1/2">
                <button className={`text-white ${isInHeader ? "" : "dark:text-black"} text-xl lg:text-2xl ${disabledStyle ? "disabled:opacity-25" : ""}`} disabled={disabled && disabledStyle}>{text}</button>
                <button className={`text-white ${isInHeader ? "" : "dark:text-black"} text-xl lg:text-2xl ${disabledStyle ? "disabled:opacity-25" : ""}`} disabled={disabled && disabledStyle}>{text}</button>
            </div>
        </div>
        {brackets && <span className={`absolute -right-3 top-0 text-white ${isInHeader ? "" : "dark:text-black"} text-xl lg:text-2xl ${disabled && disabledStyle ? 'opacity-25' : ''}`}>]</span>}
    </div>
  )
}
