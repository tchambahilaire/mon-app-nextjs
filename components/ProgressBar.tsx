"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function ProgressBar() {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    setProgress(0)

    const timer1 = setTimeout(() => setProgress(30), 100)
    const timer2 = setTimeout(() => setProgress(60), 300)
    const timer3 = setTimeout(() => setProgress(85), 500)

    const timer4 = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setVisible(false), 300)
    }, 800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [pathname])

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full bg-gradient-to-r from-[#00f0ff] via-[#b47aff] to-[#ff6b8a] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
