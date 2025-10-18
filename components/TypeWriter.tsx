'use client'

import { useState, useEffect } from 'react'

interface TypeWriterProps {
  texts: string[]
  delay?: number
}

export function TypeWriter({ texts, delay = 2000 }: TypeWriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const text = texts[currentTextIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < text.length) {
          setCurrentText(text.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), delay)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 100 : 150)

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts, delay])

  return (
    <span className="text-secondary">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}