interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export function Loading({ size = 'md', text = 'Loading...', className = '' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className={`${sizeClasses[size]} animate-glass-pulse border-2 border-primary border-t-transparent rounded-full`}></div>
      {text && (
        <p className="text-foreground-secondary text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}