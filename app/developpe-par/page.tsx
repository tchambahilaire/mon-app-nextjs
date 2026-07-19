"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function DeveloppePar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#0b0d1a] text-[#d0d6f0] flex flex-col items-center justify-center p-4"
    >
      <style>{`
        .btn-neon {
          background: linear-gradient(135deg, #00f0ff, #b47aff);
          color: #080a1a;
          border: none;
          padding: 12px 32px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.15);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
        }

        .btn-neon:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 0 60px rgba(0, 240, 255, 0.25);
        }

        .card {
          background: rgba(16, 21, 43, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 240, 255, 0.06);
          border-radius: 24px;
          padding: 40px;
          text-align: center;
          max-width: 500px;
          width: 100%;
        }

        .card:hover {
          border-color: rgba(0, 240, 255, 0.15);
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.05);
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <span className="text-7xl block animate-float">⚡</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          <span className="bg-gradient-to-r from-[#00f0ff] to-[#b47aff] bg-clip-text text-transparent font-['Orbitron',monospace]">
            Développé par
          </span>
        </h1>
        <p className="text-[#5a6a8a] mb-8 font-['Inter',sans-serif]">
          Une application full stack Next.js
        </p>

        <div className="card">
          <div className="text-3xl font-bold text-[#00f0ff] font-['Orbitron',monospace]">
            Mon Général
          </div>
          <div className="text-[#b47aff] mb-4">✦ Développeur Full Stack ✦</div>

          <div className="border-t border-[#1f2a50] my-4"></div>

          <div className="grid grid-cols-2 gap-3 text-left my-4">
            <div className="bg-[#0b0d1a] p-3 rounded-xl border border-[#1f2a50]">
              <div className="text-[#5a6a8a] text-xs uppercase tracking-wider">Stack</div>
              <div className="text-sm">Next.js · Prisma · Neon</div>
            </div>
            <div className="bg-[#0b0d1a] p-3 rounded-xl border border-[#1f2a50]">
              <div className="text-[#5a6a8a] text-xs uppercase tracking-wider">Design</div>
              <div className="text-sm">Cyberpunk / Néon</div>
            </div>
            <div className="bg-[#0b0d1a] p-3 rounded-xl border border-[#1f2a50]">
              <div className="text-[#5a6a8a] text-xs uppercase tracking-wider">Auth</div>
              <div className="text-sm">JWT · bcrypt</div>
            </div>
            <div className="bg-[#0b0d1a] p-3 rounded-xl border border-[#1f2a50]">
              <div className="text-[#5a6a8a] text-xs uppercase tracking-wider">API</div>
              <div className="text-sm">Server Actions</div>
            </div>
          </div>

          <div className="border-t border-[#1f2a50] my-4"></div>

          <Link href="/dashboard" className="btn-neon">
            <i className="fas fa-arrow-left"></i> Retour au Dashboard
          </Link>
        </div>

        <div className="mt-8 text-[#3a4a6a] text-sm font-['Inter',sans-serif]">
          <p>© 2026 Mon Général · Tous droits réservés</p>
          <p className="mt-1 text-xs">✦ Construit avec ❤️ ✦</p>
        </div>
      </motion.div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  )
}
