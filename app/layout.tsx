import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./styles.css"
import ToastProvider from "@/components/ToastProvider"
import SkipLink from "@/components/SkipLink"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  title: "MonApp - Gestion de ressources",
  description: "Application Full Stack Next.js pour gérer vos ressources en toute simplicité",
  keywords: "Next.js, Prisma, Neon, Authentification, CRUD",
  authors: [{ name: "Mon Général" }],
  openGraph: {
    title: "MonApp - Gestion de ressources",
    description: "Application Full Stack Next.js pour gérer vos ressources",
    type: "website",
  },
  robots: "index, follow",
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
      <body className="bg-[#0a0c1a] text-[#eef4ff] min-h-screen font-sans">
        <SkipLink />
        <ToastProvider />
        <main id="main-content">{children}</main>
      </body>
    </html>
  )
}
