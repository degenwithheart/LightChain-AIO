import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group";

    const variantClasses = {
      default: "glass-button bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 hover:border-primary/40",
      secondary: "glass-button bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20 hover:border-secondary/40",
      outline: "glass-button bg-transparent hover:bg-white/5 text-foreground border-glass-border hover:border-white/20",
      ghost: "hover:bg-white/5 text-foreground-secondary hover:text-foreground",
      link: "text-primary underline-offset-4 hover:underline hover:text-primary-light",
    };

    const sizeClasses = {
      default: "h-11 px-6 py-2 text-sm",
      sm: "h-9 px-4 py-1.5 text-xs",
      lg: "h-12 px-8 py-3 text-base",
      icon: "h-11 w-11 p-0",
    };

    return (
      <button
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {props.children}
        </span>
        {variant !== 'link' && variant !== 'ghost' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };