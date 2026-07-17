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
          border: '1px solid #1f2a4a',
          borderRadius: '12px',
          fontFamily: 'Courier New, monospace',
        },
        success: {
          style: {
            border: '1px solid #00f0ff',
          },
          iconTheme: {
            primary: '#00f0ff',
            secondary: '#0b0d1a',
          },
        },
        error: {
          style: {
            border: '1px solid #ff6b8a',
          },
          iconTheme: {
            primary: '#ff6b8a',
            secondary: '#0b0d1a',
          },
        },
      }}
    />
  )
}
