"use client"

import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#1a1f38',
          color: '#d0d6f0',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          borderRadius: '12px',
          fontFamily: 'Inter, sans-serif',
        },
        success: {
          iconTheme: { primary: '#00f0ff', secondary: '#080a1a' },
        },
        error: {
          iconTheme: { primary: '#ff6b8a', secondary: '#080a1a' },
        },
      }}
    />
  )
}
