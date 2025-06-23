interface BracketButtonProps {
	text: string
	className?: string
	disabled?: boolean
	onClick?: () => void
	disabledStyle?: boolean
	brackets?: boolean
	isInHeader?: boolean
	color?: string
	textSize?: string
	height?: string
	bracketDistance?: string
	isCloseBtn?: boolean
}

export default function BracketButton({
	className,
	disabled,
	onClick,
	text,
	disabledStyle = true,
	brackets = true,
	isInHeader = false,
	color = 'text-white',
	textSize = 'text-xl lg:text-2xl',
	isCloseBtn = false
}: BracketButtonProps) {
	return (
		<div
			className={`hover:opacity-75 transition-opacity duration-500 relative ${brackets ? '' : ''} ${
				disabled ? '' : 'cursor-pointer group'
			} ${className}`}
			onClick={() => {
				if (!disabled && onClick) onClick()
			}}
		>
			<button
				className={`transition-opacity duration-500 ${color} ${isInHeader ? '' : 'dark:text-black'} ${textSize} ${
					disabledStyle ? 'disabled:opacity-25' : ''
				}`}
				disabled={disabled && disabledStyle}
			>
				{text}
			</button>

			<div
				className={`bottom-[-0.125rem] h-[1px] duration-500 group-hover:scale-x-0 ${
					isCloseBtn ? 'origin-left' : 'origin-right'
				} transition-all left-0 right-0 ${
					isInHeader ? 'bg-white' : 'dark:bg-black bg-white'
				} absolute ${disabledStyle && disabled ? 'opacity-25' : 'opacity-100'}`}
			/>
		</div>
	)
}
