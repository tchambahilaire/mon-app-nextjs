import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
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
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #0a0c1a; color: #eef4ff; font-family: 'Inter', sans-serif; min-height: 100vh; overflow-x: hidden; }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #0a0c1a; }
          ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #00f0ff, #b47aff); border-radius: 10px; }
          .glass { background: rgba(16, 21, 43, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(0, 240, 255, 0.06); }
          .btn-neon { background: linear-gradient(135deg, #00f0ff, #b47aff); color: #080a1a; border: none; padding: 12px 32px; border-radius: 9999px; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: all 0.4s ease; box-shadow: 0 0 30px rgba(0, 240, 255, 0.15); display: inline-flex; align-items: center; justify-content: center; gap: 10px; text-decoration: none; }
          .btn-neon:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 0 60px rgba(0, 240, 255, 0.25); }
          .btn-outline { background: transparent; border: 1.5px solid rgba(0, 240, 255, 0.3); color: #00f0ff; padding: 12px 32px; border-radius: 9999px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: all 0.4s ease; display: inline-flex; align-items: center; justify-content: center; gap: 10px; text-decoration: none; }
          .btn-outline:hover { background: #00f0ff; color: #080a1a; box-shadow: 0 0 60px rgba(0, 240, 255, 0.25); transform: translateY(-3px); }
          .stat-card { background: #151a3a; border: 1px solid rgba(0, 240, 255, 0.06); border-radius: 16px; padding: 24px; transition: all 0.4s ease; }
          .stat-card:hover { transform: translateY(-4px); border-color: rgba(0, 240, 255, 0.15); box-shadow: 0 0 30px rgba(0, 240, 255, 0.05); }
          .stat-value { font-size: 36px; font-weight: 800; background: linear-gradient(135deg, #00f0ff, #b47aff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .resource-card { background: #151a3a; border: 1px solid rgba(0, 240, 255, 0.06); border-radius: 24px; padding: 24px; transition: all 0.4s ease; }
          .resource-card:hover { transform: translateY(-6px); border-color: rgba(0, 240, 255, 0.15); box-shadow: 0 0 30px rgba(0, 240, 255, 0.05); }
          .badge-published { background: rgba(52, 211, 153, 0.08); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.1); padding: 4px 14px; border-radius: 9999px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
          .badge-draft { background: rgba(255, 107, 138, 0.08); color: #ff6b8a; border: 1px solid rgba(255, 107, 138, 0.1); padding: 4px 14px; border-radius: 9999px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
          .input-neon { background: rgba(8, 10, 26, 0.6); border: 1.5px solid rgba(0, 240, 255, 0.06); border-radius: 16px; padding: 14px 20px; color: #eef4ff; font-size: 15px; transition: all 0.3s ease; width: 100%; outline: none; }
          .input-neon:focus { border-color: #00f0ff; box-shadow: 0 0 30px rgba(0, 240, 255, 0.05); }
          .empty-state { background: #151a3a; border: 2px dashed rgba(0, 240, 255, 0.06); border-radius: 24px; padding: 60px 40px; text-align: center; }
          .empty-state:hover { border-color: rgba(0, 240, 255, 0.12); }
          .text-gradient { background: linear-gradient(135deg, #00f0ff, #b47aff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .font-orbitron { font-family: 'Orbitron', monospace; }
          @media (max-width: 768px) { .stat-value { font-size: 28px; } .stat-card, .resource-card { padding: 18px; } .btn-neon, .btn-outline { padding: 10px 20px; font-size: 13px; } }
          @media (max-width: 480px) { .stat-value { font-size: 24px; } }
        `}</style>
      </head>
      <body className="bg-[#0a0c1a] text-[#eef4ff] min-h-screen font-sans">
        <SkipLink />
        <ToastProvider />
        <main id="main-content">{children}</main>
      </body>
    </html>
  )
}
