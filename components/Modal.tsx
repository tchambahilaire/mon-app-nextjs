"use client"

import { motion, AnimatePresence } from "framer-motion"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

export default function Modal({ isOpen, onClose, onConfirm, title, message }: ModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#1a1f38] border border-[#00f0ff]/20 rounded-2xl p-8 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-bold text-[#eef4ff] mb-2 font-['Inter',sans-serif]">
            {title}
          </h3>
          <p className="text-[#5a6a8a] mb-6 font-['Inter',sans-serif]">
            {message}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-[#00f0ff] to-[#b47aff] text-[#080a1a] px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              Confirmer
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-[#0b0d1a] border border-[#1f2a50] text-[#5a6a8a] px-6 py-3 rounded-xl hover:border-[#ff6b8a] hover:text-[#ff6b8a] transition"
            >
              Annuler
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
