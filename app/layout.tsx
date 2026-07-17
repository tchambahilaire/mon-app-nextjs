import type { Metadata } from "next"
import "./globals.css"
import ToastProvider from "@/components/ToastProvider"

export const metadata: Metadata = {
  title: "MonApp - Neon Console",
  description: "Gérez vos ressources en toute simplicité",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body className="bg-[#0b0d1a] text-[#d0d6f0] min-h-screen">
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}
