'use client'

interface MenuButtonProps {
    className?: string,
    disabled: boolean,
    onClick: () => void,
    isSwitchTime: boolean,
    texts: string[]
}

export default function SwitchBracketButton({ className, disabled, onClick, isSwitchTime, texts }: MenuButtonProps) {

  return (
    <div className={`relative mx-3 group ${disabled ? "" : "cursor-pointer"}`} onClick={() => {if (!disabled) onClick()}}>
        <span className={`absolute -left-3 top-0 text-white text-xl lg:text-2xl transition-transform duration-200`}>[</span>
        <div className={`relative h-6 lg:h-8 overflow-hidden transition-all duration-300 ${className}`}>
            <div className="absolute left-0 top-0 w-full transition duration-300" style={{transform: `translateY(${isSwitchTime ? "-50%" : "0%"})`}}>
                <div className="transition duration-300 group-hover:-translate-y-1/2">
                    <button className={`text-white text-xl lg:text-2xl transition-transform duration-200`} disabled={disabled}>{texts[0]}</button>
                    <button className={`text-white text-xl lg:text-2xl transition-transform duration-200`} disabled={disabled}>{texts[0]}</button>
                </div>
                <div className={`transition duration-300 group-hover:-translate-y-1/2 ${isSwitchTime ? "" : ""}`}>
                    <button className={`text-white text-xl lg:text-2xl transition-transform duration-200`} disabled={disabled}>{texts[1]}</button>
                    <button className={`text-white text-xl lg:text-2xl transition-transform duration-200`} disabled={disabled}>{texts[1]}</button>
                </div>
            </div>
        </div>
        <span className={`absolute -right-3 top-0 text-white text-xl lg:text-2xl transition-transform duration-200`}>]</span>
    </div>
  )
}
