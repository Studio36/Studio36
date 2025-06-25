import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-[calc(100%-.25rem)] box-border rounded-md font-normal pr-3 py-2 file:bg-transparent placeholder:text-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 font-hedwig",
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