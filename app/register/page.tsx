"use client"

import { register } from "@/actions/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await register(formData)
      
      if (result?.error) {
        setError(result.error)
        setLoading(false)
        return
      }

      router.push("/login?registered=true")
    } catch (err) {
      setError("Une erreur est survenue")
      setLoading(false)
    }
  }

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
          padding: 14px 40px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.15);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          font-family: 'Inter', sans-serif;
        }

        .btn-neon:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 0 60px rgba(0, 240, 255, 0.25);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 14px;
          color: #5a6a8a;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
        }

        .form-group input {
          background: rgba(8, 10, 26, 0.6);
          border: 1.5px solid rgba(0, 240, 255, 0.06);
          border-radius: 16px;
          padding: 14px 20px;
          color: #eef4ff;
          font-size: 15px;
          transition: all 0.3s ease;
          width: 100%;
          outline: none;
          font-family: 'Inter', sans-serif;
        }

        .form-group input:focus {
          border-color: #00f0ff;
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.05);
        }

        .form-footer {
          text-align: center;
          margin-top: 10px;
          color: #5a6a8a;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
        }

        .form-footer a {
          color: #00f0ff;
          text-decoration: none;
          transition: 0.3s;
        }

        .form-footer a:hover {
          text-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-[480px] space-y-8 flex-1 flex flex-col justify-center"
      >
        <h2 className="text-3xl font-normal text-[#eef4ff] flex items-center gap-3">
          <span className="text-[#b47aff]">✨</span>
          Inscription
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
              <i className="fas fa-exclamation-triangle mr-2"></i> {error}
            </div>
          )}

          <div className="form-group">
            <label><i className="fas fa-user"></i> Nom</label>
            <input type="text" name="name" required />
          </div>

          <div className="form-group">
            <label><i className="fas fa-envelope"></i> Email</label>
            <input type="email" name="email" required />
          </div>

          <div className="form-group">
            <label><i className="fas fa-key"></i> Mot de passe</label>
            <input type="password" name="password" required />
          </div>

          <button type="submit" className="btn-neon" disabled={loading}>
            <i className="fas fa-arrow-right"></i> {loading ? 'Inscription...' : "S'inscrire"}
          </button>

          <div className="form-footer">
            Déjà un compte ? <Link href="/login">Se connecter</Link>
          </div>
        </form>
      </motion.div>

      <Footer />
    </motion.div>
  )
}
