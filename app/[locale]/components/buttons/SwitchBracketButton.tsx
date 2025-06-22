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
    <div className={`relative hover:opacity-75 transition-opacity duration-500 group ${disabled ? "" : "cursor-pointer"}`} onClick={() => {if (!disabled) onClick()}}>
        <span className={`absolute -left-3 top-0 text-white dark:text-black text-xl lg:text-2xl transition-transform duration-200`}></span>
        <div className={`relative h-6 lg:h-8 overflow-hidden transition-all duration-300 ${className}`}>
            <div className="absolute left-0 top-0 w-full transition duration-300" style={{transform: `translateY(${isSwitchTime ? "-50%" : "0%"})`}}>
                <button className={`text-white dark:text-black text-xl lg:text-2xl transition-transform duration-200 whitespace-nowrap w-full`} disabled={disabled}>{texts[0]}</button>
                <button className={`text-white dark:text-black text-xl lg:text-2xl transition-transform duration-200 whitespace-nowrap w-full`} disabled={disabled}>{texts[1]}</button>
            </div>
        </div>
        <span className={`absolute -right-3 top-0 text-white dark:text-black text-xl lg:text-2xl transition-transform duration-200`}></span>

        <div className={`bottom-[-0.125rem] h-[1px] duration-500 group-hover:scale-x-0 origin-right transition-transform left-0 right-0 bg-white dark:bg-black absolute ${disabled ? "opacity-25" : "opacity-100"}`}/>
    </div>
  )
}
