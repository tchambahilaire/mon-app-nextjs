"use client"

import { login } from "@/actions/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Footer from "@/components/Footer"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await login(formData)
      
      if (result?.error) {
        setError(result.error)
        setLoading(false)
        return
      }

      router.push("/dashboard")
    } catch (err) {
      setError("Une erreur est survenue")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0d1a] text-[#d0d6f0] font-['Courier_New',monospace] flex flex-col items-center justify-center p-4">
      <style>{`
        .btn-neon {
          background: transparent;
          border: 1.5px solid #00f0ff;
          color: #00f0ff;
          padding: 14px 40px;
          border-radius: 40px;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 1px;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 0 20px #00f0ff22, inset 0 0 20px #00f0ff08;
          font-family: 'Courier New', monospace;
          text-transform: uppercase;
          width: 100%;
        }
        .btn-neon:hover {
          background: #00f0ff;
          color: #0b0d1a;
          box-shadow: 0 0 50px #00f0ff66, inset 0 0 30px #00f0ff44;
          transform: scale(1.03);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-size: 14px;
          color: #8892b0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .form-group input {
          background: #10152b;
          border: 1px solid #1f2a50;
          border-radius: 12px;
          padding: 14px 18px;
          color: #d0d6f0;
          font-size: 15px;
          transition: 0.3s;
          font-family: 'Courier New', monospace;
          outline: none;
          width: 100%;
        }
        .form-group input:focus {
          border-color: #00f0ff;
          box-shadow: 0 0 25px #00f0ff22, inset 0 0 25px #00f0ff08;
        }

        .form-footer {
          text-align: center;
          margin-top: 10px;
          color: #6a7aaa;
          font-size: 14px;
        }
        .form-footer a {
          color: #00f0ff;
          text-decoration: none;
          cursor: pointer;
          transition: 0.3s;
        }
        .form-footer a:hover {
          text-shadow: 0 0 20px #00f0ff66;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="w-full max-w-[480px] space-y-8 flex-1 flex flex-col justify-center" style={{ animation: 'fadeIn 0.4s ease' }}>
        <h2 className="text-3xl font-normal text-[#eef4ff] shadow-[0_0_20px_#00f0ff33]">
          <i className="fas fa-lock text-[#00f0ff] mr-3"></i> Connexion
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
              <i className="fas fa-exclamation-triangle mr-2"></i> {error}
            </div>
          )}

          <div className="form-group">
            <label><i className="fas fa-envelope"></i> Email</label>
            <input type="email" name="email" required />
          </div>

          <div className="form-group">
            <label><i className="fas fa-key"></i> Mot de passe</label>
            <input type="password" name="password" required />
          </div>

          <button type="submit" className="btn-neon" disabled={loading}>
            <i className="fas fa-arrow-right"></i> {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          <div className="form-footer">
            Pas encore de compte ? <Link href="/register">S'inscrire</Link>
          </div>
        </form>
      </div>

      <Footer />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    </div>
  )
}
