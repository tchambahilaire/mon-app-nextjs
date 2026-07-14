"use client"

import { useState, useEffect } from "react"
import { getResources } from "@/actions/resources"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RessourcesPage() {
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getResources()
        setResources(data)
      } catch (error) {
        console.error('Erreur:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0d1a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00f0ff] mx-auto"></div>
          <p className="mt-4 text-[#00f0ff] font-['Courier_New',monospace]">Chargement...</p>
        </div>
      </div>
    )
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

        .resource-card {
          background: #10152b;
          border: 1px solid #1f2a50;
          border-radius: 16px;
          padding: 24px;
          transition: 0.3s;
        }
        .resource-card:hover {
          border-color: #b47aff;
          box-shadow: 0 0 30px #b47aff15;
          transform: translateY(-4px);
        }

        .empty-state {
          background: #10152b;
          border: 2px dashed #1f2a50;
          border-radius: 24px;
          padding: 60px 40px;
          text-align: center;
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-normal text-[#eef4ff] shadow-[0_0_20px_#b47aff33]">
            <i className="fas fa-box text-[#b47aff] mr-3"></i> Mes ressources
          </h2>
          <Link href="/ressources/nouveau" className="btn-neon text-sm py-2 px-4">
            <i className="fas fa-plus"></i> Nouvelle
          </Link>
        </div>

        {resources.length === 0 ? (
          <div className="empty-state">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-[#eef4ff] mb-2">Aucune ressource</h3>
            <p className="text-[#8892b0] mb-4">Vous n'avez pas encore créé de ressource.</p>
            <Link href="/ressources/nouveau" className="btn-neon text-sm py-2 px-6">
              <i className="fas fa-plus"></i> Créer ma première ressource
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-[#eef4ff] line-clamp-1">
                    {resource.title}
                  </h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                    resource.published 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {resource.published ? '📢 Publié' : '✏️ Brouillon'}
                  </span>
                </div>
                <p className="text-[#8892b0] text-sm line-clamp-2 mb-4">
                  {resource.content}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#6a7aaa] mb-4">
                  <i className="fas fa-calendar-alt"></i>
                  <span>{new Date(resource.createdAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}</span>
                </div>
                <div className="flex gap-2">
                  <Link 
                    href={`/ressources/${resource.id}`}
                    className="flex-1 text-center bg-[#1a1f38] text-[#d0d6f0] px-3 py-2 rounded-lg hover:bg-[#1f2a50] transition text-sm font-mono flex items-center justify-center gap-1"
                  >
                    <i className="fas fa-eye"></i> Voir
                  </Link>
                  <Link 
                    href={`/ressources/${resource.id}/edit`}
                    className="flex-1 text-center bg-[#1a1f38] text-[#b47aff] px-3 py-2 rounded-lg hover:bg-[#1f2a50] transition text-sm font-mono flex items-center justify-center gap-1"
                  >
                    <i className="fas fa-edit"></i> Modifier
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    </div>
  )
}
