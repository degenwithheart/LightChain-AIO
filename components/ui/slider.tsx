import * as React from "react"
import { cn } from "../../lib/utils"

export interface SliderProps {
  value?: number[]
  onValueChange?: (value: number[]) => void
  max?: number
  min?: number
  step?: number
  className?: string
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, max = 100, min = 0, step = 1, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value)
      onValueChange?.([newValue])
    }

    return (
      <input
        type="range"
        ref={ref}
        className={cn(
          "w-full h-2 glass-input appearance-none cursor-pointer slider-thumb:bg-primary slider-track:bg-glass-border rounded-lg",
          className
        )}
        value={value?.[0] || min}
        onChange={handleChange}
        max={max}
        min={min}
        step={step}
        {...props}
      />
    )
  }
)
Slider.displayName = "Slider"

export { Slider }