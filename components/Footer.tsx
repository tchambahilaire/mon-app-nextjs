"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="w-full text-center py-6 mt-auto border-t border-[#1f2a4a] bg-[#0f1222]/50"
    >
      <p className="text-[#475569] text-sm font-['Inter',sans-serif]">
        Développé par{' '}
        <Link 
          href="/developpe-par" 
          className="text-[#00f0ff] hover:text-[#b47aff] transition-all duration-300 hover:shadow-[0_0_20px_#00f0ff33]"
        >
          Mon Général
        </Link>
        {' '}© 2026
      </p>
      <p className="text-[#3a4a6a] text-xs mt-1 font-['Inter',sans-serif]">
        ✦ Next.js 16 · Prisma · Neon · Full Stack ✦
      </p>
      <div className="flex justify-center gap-4 mt-3">
        <a href="#" className="text-[#3a4a6a] hover:text-[#00f0ff] transition">
          <i className="fab fa-github"></i>
        </a>
        <a href="#" className="text-[#3a4a6a] hover:text-[#00f0ff] transition">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-[#3a4a6a] hover:text-[#00f0ff] transition">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </motion.footer>
  )
}
