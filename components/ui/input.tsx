import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-[calc(100%-.25rem)] box-border rounded-md bg-white font-normal pr-3 py-2 pl-1 text-2xl ml-1 file:bg-transparent placeholder:text-opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-black dark:ring-white dark:focus-visible:ring-1 font-hedwig transition-all duration-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }