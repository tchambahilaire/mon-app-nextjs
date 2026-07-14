"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getResources } from "@/actions/resources"
import { logout } from "@/actions/auth"
import { DeleteButton } from "@/components/DeleteButton"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      try {
        // Récupérer la session via l'API
        const sessionRes = await fetch('/api/auth/session', {
          credentials: 'include',
        })
        
        if (!sessionRes.ok) {
          router.push('/login')
          return
        }
        
        const sessionData = await sessionRes.json()
        if (!sessionData.user) {
          router.push('/login')
          return
        }
        
        setUser(sessionData.user)
        
        // Récupérer les ressources
        const resourcesData = await getResources()
        setResources(resourcesData)
      } catch (error) {
        console.error('Error loading data:', error)
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

  if (!user) return null

  const publishedCount = resources.filter(r => r.published).length
  const draftCount = resources.filter(r => !r.published).length
  const totalCount = resources.length
  const rate = totalCount ? Math.round((publishedCount / totalCount) * 100) : 0

  return (
    <div className="min-h-screen bg-[#0b0d1a] text-[#d0d6f0] font-['Courier_New',monospace]">
      <style>{`
        /* ========== RESET & BASE ========== */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Courier New', monospace;
        }

        body {
          background: #0b0d1a;
          color: #d0d6f0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* ========== NAVIGATION ========== */
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
        .nav-links a, .nav-links button {
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
        .nav-links a:hover, .nav-links button:hover {
          color: #00f0ff;
          background: #1a1f38;
          border-color: #00f0ff44;
        }
        .nav-links a.active, .nav-links button.active {
          color: #00f0ff;
          background: #1a1f38;
          border-color: #00f0ff;
          box-shadow: 0 0 20px #00f0ff15;
        }

        /* ========== PAGE ========== */
        .page {
          flex: 1;
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

        /* ========== BOUTONS NÉON ========== */
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

        .btn-neon-secondary {
          border-color: #b47aff;
          color: #b47aff;
          box-shadow: 0 0 20px #b47aff22, inset 0 0 20px #b47aff08;
        }
        .btn-neon-secondary:hover {
          background: #b47aff;
          color: #0b0d1a;
          box-shadow: 0 0 50px #b47aff66, inset 0 0 30px #b47aff44;
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

        /* ========== STATS ========== */
        .stat-card {
          background: #10152b;
          border: 1px solid #1f2a50;
          border-radius: 16px;
          padding: 24px;
          transition: 0.3s;
        }
        .stat-card:hover {
          border-color: #00f0ff;
          box-shadow: 0 0 30px #00f0ff15;
          transform: translateY(-2px);
        }
        .stat-value {
          font-size: 32px;
          font-weight: 700;
          color: #00f0ff;
          text-shadow: 0 0 30px #00f0ff33;
        }

        /* ========== RESOURCE CARDS ========== */
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

        /* ========== EMPTY STATE ========== */
        .empty-state {
          background: #10152b;
          border: 2px dashed #1f2a50;
          border-radius: 24px;
          padding: 60px 40px;
          text-align: center;
        }

        /* ========== RESPONSIVE ========== */
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
          .btn-neon {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
          .stat-value {
            font-size: 24px;
          }
        }
      `}</style>

      {/* ===== NAVIGATION ===== */}
      <nav className="navbar">
        <div className="logo"><i className="fas fa-terminal"></i>MonApp</div>
        <div className="nav-links">
          <Link href="/dashboard" className="active">
            <i className="fas fa-home"></i> Accueil
          </Link>
          <Link href="/ressources">
            <i className="fas fa-box"></i> Ressources
          </Link>
          <form action={logout}>
            <button type="submit">
              <i className="fas fa-sign-out-alt"></i> Déconnexion
            </button>
          </form>
        </div>
      </nav>

      {/* ===== PAGE ===== */}
      <div className="page">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-normal text-[#eef4ff] flex items-center gap-3">
              <span className="text-[#00f0ff] shadow-[0_0_20px_#00f0ff33]">⚡</span>
              Dashboard
            </h1>
            <p className="text-[#8892b0] mt-1 flex items-center gap-2">
              <i className="fas fa-user"></i> Bienvenue, <strong className="text-[#d0d6f0]">{user?.name || user?.email}</strong>
            </p>
          </div>
          <Link href="/ressources/nouveau" className="btn-neon text-sm py-3 px-6">
            <i className="fas fa-plus"></i> Nouvelle ressource
          </Link>
        </div>

        {/* STATS DYNAMIQUES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#8892b0] text-sm uppercase tracking-wider">Total</span>
              <span className="text-2xl">📦</span>
            </div>
            <div className="stat-value">{totalCount}</div>
            <div className="text-xs text-[#34d399] mt-2 flex items-center gap-1">▲ +0%</div>
          </div>
          <div className="stat-card">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#8892b0] text-sm uppercase tracking-wider">Brouillons</span>
              <span className="text-2xl">✏️</span>
            </div>
            <div className="stat-value">{draftCount}</div>
            <div className="text-xs text-[#34d399] mt-2 flex items-center gap-1">▲ +0%</div>
          </div>
          <div className="stat-card">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#8892b0] text-sm uppercase tracking-wider">Publiées</span>
              <span className="text-2xl">🚀</span>
            </div>
            <div className="stat-value">{publishedCount}</div>
            <div className="text-xs text-[#34d399] mt-2 flex items-center gap-1">▲ +0%</div>
          </div>
          <div className="stat-card">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#8892b0] text-sm uppercase tracking-wider">Taux</span>
              <span className="text-2xl">⚡</span>
            </div>
            <div className="stat-value">{rate}%</div>
            <div className="text-xs text-[#34d399] mt-2 flex items-center gap-1">▲ +0%</div>
          </div>
        </div>

        {/* RESSOURCES DYNAMIQUES */}
        {resources.length === 0 ? (
          <div className="empty-state">
            <div className="text-6xl mb-4">⚡</div>
            <h2 className="text-2xl font-bold text-[#eef4ff] mb-2">Commencez votre aventure</h2>
            <p className="text-[#8892b0] mb-6">Créez votre première ressource et donnez vie à vos idées</p>
            <Link href="/ressources/nouveau" className="btn-neon">
              <i className="fas fa-plus"></i> Créer ma première ressource
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-[#eef4ff] line-clamp-1">{resource.title}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                    resource.published 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {resource.published ? '📢 Publié' : '✏️ Brouillon'}
                  </span>
                </div>
                <p className="text-[#8892b0] text-sm line-clamp-2 mb-4">{resource.content}</p>
                <div className="flex items-center gap-2 text-xs text-[#6a7aaa] mb-4">
                  <i className="fas fa-calendar-alt"></i>
                  <span>{new Date(resource.createdAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/ressources/${resource.id}`} className="flex-1 text-center bg-[#1a1f38] text-[#d0d6f0] px-3 py-2 rounded-lg hover:bg-[#1f2a50] transition text-sm font-mono flex items-center justify-center gap-1">
                    <i className="fas fa-eye"></i> Voir
                  </Link>
                  <Link href={`/ressources/${resource.id}/edit`} className="flex-1 text-center bg-[#1a1f38] text-[#b47aff] px-3 py-2 rounded-lg hover:bg-[#1f2a50] transition text-sm font-mono flex items-center justify-center gap-1">
                    <i className="fas fa-edit"></i> Modifier
                  </Link>
                  <DeleteButton id={resource.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== FONT AWESOME CDN ===== */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    </div>
  )
}
