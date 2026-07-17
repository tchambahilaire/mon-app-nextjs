"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0d1a] text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-[#00f0ff] mb-4"
        >
          ⚡ MonApp
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 mb-8"
        >
          Gérez vos ressources en toute simplicité
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <Link
            href="/login"
            className="px-8 py-4 bg-[#00f0ff] text-black rounded-full font-bold hover:scale-105 transition shadow-[0_0_30px_#00f0ff33]"
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="px-8 py-4 bg-transparent border-2 border-[#00f0ff] text-[#00f0ff] rounded-full font-bold hover:bg-[#00f0ff] hover:text-black transition"
          >
            S'inscrire
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}
