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

export default function BracketButton({ className, disabled, onClick, text, disabledStyle = true, brackets = true, isInHeader = false, color = "text-white", textSize = "text-xl lg:text-2xl", height = "h-6 lg:h-8", bracketDistance = "-0.75rem" }: BracketButtonProps) {
  
  return (
    <div className={`relative ${brackets ? "mx-3" : ""} ${disabled ? "" : "cursor-pointer group"} ${className}`} onClick={() => {if (!disabled && onClick) onClick()}}>
        {brackets && <span style={{left: bracketDistance}} className={`absolute top-0 ${color} ${isInHeader ? "" : "dark:text-black"} ${textSize} ${disabled && disabledStyle ? 'opacity-25' : ''}`}>[</span>}
        <div className={`relative ${height} overflow-hidden`}>
            <p className={`invisible ${textSize}`}> {text}</p>
            <div className="absolute left-0 top-0 w-full transition duration-300 lg:group-hover:-translate-y-1/2">
                <button className={`${color} ${isInHeader ? "" : "dark:text-black"} ${textSize} ${disabledStyle ? "disabled:opacity-25" : ""}`} disabled={disabled && disabledStyle}>{text}</button>
                <button className={`${color} ${isInHeader ? "" : "dark:text-black"} ${textSize} ${disabledStyle ? "disabled:opacity-25" : ""}`} disabled={disabled && disabledStyle}>GAY</button>
            </div>
        </div>
        {brackets && <span style={{right: bracketDistance}} className={`absolute top-0 ${color} ${isInHeader ? "" : "dark:text-black"} ${textSize} ${disabled && disabledStyle ? 'opacity-25' : ''}`}>]</span>}
    </div>
  )
}