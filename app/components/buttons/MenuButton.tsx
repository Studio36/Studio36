interface MenuButtonProps {
    text: string,
    width: string,
    className?: string,
    disabled?: boolean,
    onClick: () => void,
    disabledStyle?: boolean,
    isOpen: boolean
}

export default function MenuButton({ width, className, disabled, onClick, text, disabledStyle = true, isOpen }: MenuButtonProps) {
  
  return (
    <div className={`relative ${disabled ? "" : "cursor-pointer group"} ${className}`} onClick={() => {if (!disabled) onClick()}}>
        <span className={`absolute -left-3 top-0 text-white text-2xl ${disabled && disabledStyle ? 'opacity-25' : ''}`}>[</span>
        <div className="relative h-8 overflow-hidden" style={{width: width}}>
            <div className={`absolute left-0 top-0 w-full h-full transition duration-300 ${isOpen ? "-translate-y-full" : ""}`}>
                <div className="absolute left-0 top-0 w-full transition duration-300 group-hover:-translate-y-1/2 ">
                    <button className={`text-white text-2xl ${disabledStyle ? "disabled:opacity-25" : ""}`} disabled={disabled && disabledStyle}>{text}</button>
                    <button className={`text-white text-2xl ${disabledStyle ? "disabled:opacity-25" : ""}`} disabled={disabled && disabledStyle}>{text}</button>
                </div>
            </div>
        </div>
        <span className={`absolute -right-3 top-0 text-white text-2xl ${disabled && disabledStyle ? 'opacity-25' : ''}`}>]</span>
    </div>
  )
}
