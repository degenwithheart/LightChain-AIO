export function BackgroundPaths() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden glass-grid">
      {/* Modern geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-glass-border rounded-2xl rotate-12 animate-glass-float opacity-30" />
      <div className="absolute top-40 right-20 w-24 h-24 border border-glass-border rounded-full animate-glass-float delay-1000 opacity-20" />
      <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-glass-border rounded-lg rotate-45 animate-glass-float delay-500 opacity-25" />
      <div className="absolute bottom-20 right-10 w-28 h-28 border border-glass-border rounded-xl -rotate-12 animate-glass-float delay-1500 opacity-30" />
      <div className="absolute top-1/3 left-2/3 w-20 h-20 border border-glass-border rounded-full animate-glass-float delay-2000 opacity-20" />

      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-glass-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-glass-pulse delay-1000" />
      <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-glass-pulse delay-2000" />

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary/60 rounded-full animate-glass-float opacity-80" />
      <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-glass-float delay-300 opacity-60" />
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent/60 rounded-full animate-glass-float delay-700 opacity-70" />
      <div className="absolute bottom-1/3 left-1/5 w-0.5 h-0.5 bg-primary/40 rounded-full animate-glass-float delay-500 opacity-50" />
      <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-secondary/50 rounded-full animate-glass-float delay-1200 opacity-60" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/1 to-transparent opacity-50" />
    </div>
  )
}