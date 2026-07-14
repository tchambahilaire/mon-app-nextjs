"use client"

import { createResource } from "@/actions/resources"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function NewResourcePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      await createResource(formData)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0d1a] text-[#d0d6f0] font-['Courier_New',monospace]">
      <style>{`
        .navbar {
          background: #0f1222;
          padding: 16px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #1f2a4a;
          box-shadow: 0 4px 30px rgba(0, 255, 255, 0.05);
          flex-wrap: wrap;
          gap: 15px;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          color: #00f0ff;
          text-shadow: 0 0 12px #00f0ff88, 0 0 30px #00f0ff44;
          letter-spacing: 2px;
          cursor: default;
        }
        .logo i {
          margin-right: 10px;
          color: #b47aff;
        }

        .nav-links {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .nav-links a {
          background: transparent;
          border: none;
          color: #6a7aaa;
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: 0.3s;
          font-family: 'Courier New', monospace;
          border: 1px solid transparent;
          text-decoration: none;
        }
        .nav-links a:hover {
          color: #00f0ff;
          background: #1a1f38;
          border-color: #00f0ff44;
        }
        .nav-links a.active {
          color: #00f0ff;
          background: #1a1f38;
          border-color: #00f0ff;
          box-shadow: 0 0 20px #00f0ff15;
        }

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
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .btn-neon:hover {
          background: #00f0ff;
          color: #0b0d1a;
          box-shadow: 0 0 50px #00f0ff66, inset 0 0 30px #00f0ff44;
          transform: scale(1.03);
        }

        .btn-neon-danger {
          border-color: #ff6b8a;
          color: #ff6b8a;
          box-shadow: 0 0 20px #ff6b8a22, inset 0 0 20px #ff6b8a08;
        }
        .btn-neon-danger:hover {
          background: #ff6b8a;
          color: #0b0d1a;
          box-shadow: 0 0 50px #ff6b8a66;
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
        .form-group input,
        .form-group textarea {
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
        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #00f0ff;
          box-shadow: 0 0 25px #00f0ff22, inset 0 0 25px #00f0ff08;
        }
        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #3a4a6a;
        }
        .form-group textarea {
          resize: vertical;
          min-height: 130px;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #8892b0;
          font-size: 14px;
          cursor: pointer;
        }
        .checkbox-group input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #00f0ff;
          cursor: pointer;
          background: #10152b;
          border: 1px solid #1f2a50;
          border-radius: 4px;
        }

        .form-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 10px;
        }
        .form-actions .btn-neon {
          flex: 1;
          min-width: 140px;
          text-align: center;
          padding: 12px 24px;
          font-size: 14px;
        }

        .page {
          padding: 40px 30px;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 700px) {
          .navbar {
            padding: 14px 20px;
            flex-direction: column;
            align-items: stretch;
          }
          .nav-links {
            justify-content: center;
          }
          .page {
            padding: 30px 18px;
          }
          .form-actions {
            flex-direction: column;
          }
          .btn-neon {
            width: 100%;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="logo"><i className="fas fa-terminal"></i>MonApp</div>
        <div className="nav-links">
          <Link href="/dashboard"><i className="fas fa-home"></i> Accueil</Link>
          <Link href="/ressources" className="active"><i className="fas fa-box"></i> Ressources</Link>
        </div>
      </nav>

      <div className="page">
        <h2 className="text-2xl md:text-3xl font-normal text-[#eef4ff] shadow-[0_0_20px_#b47aff33] mb-6">
          <i className="fas fa-feather-alt text-[#b47aff] mr-3"></i> Nouvelle ressource
        </h2>

        <form action={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm mb-4">
              <i className="fas fa-exclamation-triangle mr-2"></i> {error}
            </div>
          )}

          <div className="form-group">
            <label><i className="fas fa-heading"></i> Titre <span style={{color: '#ff6b8a'}}>*</span></label>
            <input type="text" name="title" placeholder="Donnez un titre à votre ressource" required />
          </div>

          <div className="form-group">
            <label><i className="fas fa-align-left"></i> Contenu <span style={{color: '#ff6b8a'}}>*</span></label>
            <textarea name="content" placeholder="Écrivez votre contenu ici..." required></textarea>
          </div>

          <label className="checkbox-group">
            <input type="checkbox" name="published" />
            <span><i className="fas fa-globe"></i> Publier immédiatement</span>
          </label>

          <div className="form-actions">
            <button type="submit" className="btn-neon" style={{flex: 2}} disabled={isLoading}>
              <i className="fas fa-save"></i> {isLoading ? 'Création...' : 'Créer la ressource'}
            </button>
            <button type="button" className="btn-neon btn-neon-danger" style={{flex: 1}} onClick={() => router.push('/dashboard')}>
              <i className="fas fa-times"></i> Annuler
            </button>
          </div>
        </form>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    </div>
  )
}
