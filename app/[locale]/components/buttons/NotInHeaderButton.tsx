interface BracketButtonProps {
	text: string
	className?: string
	disabled?: boolean
	onClick?: () => void
	disabledStyle?: boolean
	brackets?: boolean
	isInHeader?: boolean
	color?: {
		dark: string
		light: string
	}
	textSize?: string
	height?: string
	bracketDistance?: string
	isCloseBtn?: boolean
}

export default function NotInHeaderButton({
	className,
	disabled,
	onClick,
	text,
	disabledStyle = true,
	textSize = 'text-xl lg:text-2xl',
	color = { dark: 'white', light: 'black' },
}: BracketButtonProps) {
	return (
		<div
			className={`hover:opacity-75 transition-opacity duration-500 relative h-fit ${
				disabled ? '' : 'cursor-pointer group'
			} ${className}`}
			onClick={() => {
				if (!disabled && onClick) onClick()
			}}
		>
			<button
				className={`transition-opacity duration-500 dark:text-${color.dark} text-${color.light} ${textSize} ${
					disabledStyle ? 'disabled:opacity-25' : ''
				}`}
				disabled={disabled && disabledStyle}
			>
				{text}
			</button>

			<div
				className={`bottom-[-0.125rem] origin-right h-[1px] duration-500 group-hover:scale-x-0 transition-all left-0 right-0 dark:bg-${color.dark} bg-${color.light} absolute z-50 ${(disabledStyle && disabled) ? 'opacity-25' : 'opacity-100'}`}
			/>
		</div>
)}