'use client'

import { useEffect, useRef, useState } from 'react'

interface TradingViewWidgetProps {
  symbol: string
  interval?: string
  theme?: 'light' | 'dark'
  height?: number
}

declare global {
  interface Window {
    TradingView: any
  }
}

export function TradingViewWidget({
  symbol,
  interval = '1D',
  theme = 'dark',
  height = 400
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = () => {
      if (window.TradingView && containerRef.current) {
        new window.TradingView.widget({
          container_id: containerRef.current.id,
          symbol: symbol,
          interval: interval,
          theme: theme,
          style: '1',
          locale: 'en',
          toolbar_bg: 'rgba(0,0,0,0.8)',
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          studies: [],
          show_popup_button: false,
          popup_width: '1000',
          popup_height: '650',
          allow_symbol_change: true,
          details: true,
          hotlist: true,
          calendar: true,
          news: ['headlines'],
          watchlist: ['crypto'],
          height: height,
        })
        setIsLoaded(true)
      }
    }
    document.head.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [symbol, interval, theme, height])

  return (
    <div className="glass-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-primary text-lg">
          {symbol} CHART
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-foreground-secondary text-sm">Interval:</span>
          <span className="font-medium text-secondary">{interval}</span>
        </div>
      </div>

      <div className="relative">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center glass-card rounded-lg z-10">
            <div className="flex items-center space-x-3">
              <div className="animate-glass-pulse w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
              <span className="text-foreground-secondary font-medium">Loading chart...</span>
            </div>
          </div>
        )}

        <div
          id={`tradingview-${symbol.replace('/', '-')}`}
          ref={containerRef}
          className="w-full rounded-lg overflow-hidden"
          style={{ height: `${height}px` }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-foreground-muted">
        <span>Powered by TradingView</span>
        <div className="flex items-center space-x-4">
          <span>Real-time data</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  )
}