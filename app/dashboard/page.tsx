"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { getResources } from "@/actions/resources"
import { logout } from "@/actions/auth"
import { DeleteButton } from "@/components/DeleteButton"
import Footer from "@/components/Footer"
import Pagination from "@/components/Pagination"
import ThemeToggle from "@/components/ThemeToggle"
import { ResourceSkeleton, StatsSkeleton } from "@/components/ResourceSkeleton"
import toast from "react-hot-toast"

// Variants pour les animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [resources, setResources] = useState<any[]>([])
  const [filteredResources, setFilteredResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      try {
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
        
        const resourcesData = await getResources()
        setResources(resourcesData)
        setFilteredResources(resourcesData)
      } catch (error) {
        console.error('Error loading data:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [router])

  useEffect(() => {
    let filtered = resources

    if (search.trim()) {
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.content.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filter === "published") {
      filtered = filtered.filter(r => r.published)
    } else if (filter === "draft") {
      filtered = filtered.filter(r => !r.published)
    }

    setFilteredResources(filtered)
    setCurrentPage(1)
  }, [search, filter, resources])

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage)
  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const exportCSV = () => {
    if (resources.length === 0) {
      toast.error("❌ Aucune ressource à exporter")
      return
    }

    const headers = ['Titre', 'Contenu', 'Publié', 'Date de création', 'Date de modification']
    const rows = resources.map(r => [
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.content.replace(/"/g, '""')}"`,
      r.published ? 'Oui' : 'Non',
      new Date(r.createdAt).toLocaleDateString('fr-FR'),
      new Date(r.updatedAt).toLocaleDateString('fr-FR')
    ])
    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ressources_${new Date().toISOString().slice(0,10)}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("📊 Export CSV réussi !")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0d1a] p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="h-10 w-48 bg-[#1f2a50] rounded animate-pulse"></div>
              <div className="h-6 w-64 bg-[#1f2a50] rounded mt-2 animate-pulse"></div>
            </div>
            <div className="h-12 w-48 bg-[#1f2a50] rounded-full animate-pulse"></div>
          </div>
          <StatsSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <ResourceSkeleton key={i} />
            ))}
          </div>
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#0b0d1a] text-[#d0d6f0]"
    >
      <style>{`
        .navbar {
          background: rgba(8, 10, 26, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 240, 255, 0.04);
          padding: 16px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .logo {
          font-family: 'Orbitron', monospace;
          font-size: 22px;
          font-weight: 800;
          color: #00f0ff;
          text-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo i { margin-right: 10px; color: #b47aff; }

        .nav-links {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .nav-links a {
          color: #5a6a8a;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
          border: 1px solid transparent;
          font-family: 'Inter', sans-serif;
        }

        .nav-links a:hover {
          color: #00f0ff;
          background: rgba(0, 240, 255, 0.04);
          border-color: rgba(0, 240, 255, 0.06);
        }

        .nav-links a.active {
          color: #00f0ff;
          background: rgba(0, 240, 255, 0.06);
          border-color: rgba(0, 240, 255, 0.1);
        }

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
          position: relative;
          overflow: hidden;
        }

        .btn-neon::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.3) 10%, transparent 10.01%);
          background-repeat: no-repeat;
          background-position: 50%;
          transform: scale(10, 10);
          opacity: 0;
          transition: transform 0.5s, opacity 1s;
        }

        .btn-neon:active::after {
          transform: scale(0, 0);
          opacity: 0.3;
          transition: 0s;
        }

        .btn-neon:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 0 60px rgba(0, 240, 255, 0.25);
        }

        .stat-card {
          background: rgba(16, 21, 43, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 240, 255, 0.06);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #00f0ff, #b47aff);
          transform: scaleX(0);
          transition: transform 0.5s ease;
        }

        .stat-card:hover::after {
          transform: scaleX(1);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 240, 255, 0.15);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 240, 255, 0.05);
        }

        .stat-value {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, #00f0ff, #b47aff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }

        .resource-card {
          background: rgba(16, 21, 43, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 240, 255, 0.06);
          border-radius: 24px;
          padding: 24px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .resource-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #00f0ff, #b47aff);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .resource-card:hover::before {
          opacity: 1;
        }

        .resource-card:hover {
          transform: translateY(-6px);
          border-color: rgba(0, 240, 255, 0.15);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 240, 255, 0.05);
        }

        .badge-published {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 14px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: rgba(52, 211, 153, 0.08);
          color: #34d399;
          border: 1px solid rgba(52, 211, 153, 0.1);
        }

        .badge-draft {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 14px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: rgba(255, 107, 138, 0.08);
          color: #ff6b8a;
          border: 1px solid rgba(255, 107, 138, 0.1);
        }

        .input-neon {
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

        .input-neon:focus {
          border-color: #00f0ff;
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.05);
        }

        .input-neon::placeholder {
          color: #5a6a8a;
          opacity: 0.6;
        }

        .empty-state {
          background: rgba(16, 21, 43, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 2px dashed rgba(0, 240, 255, 0.06);
          border-radius: 24px;
          padding: 60px 40px;
          text-align: center;
          transition: all 0.4s ease;
        }

        .empty-state:hover {
          border-color: rgba(0, 240, 255, 0.12);
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.05);
        }

        .page {
          padding: 40px 30px;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
          flex: 1;
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 240, 255, 0.1); }
          50% { box-shadow: 0 0 40px rgba(0, 240, 255, 0.2); }
        }

        .animate-pulseGlow {
          animation: pulseGlow 2s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .navbar { padding: 14px 20px; flex-direction: column; align-items: stretch; }
          .nav-links { justify-content: center; flex-wrap: wrap; }
          .stat-value { font-size: 28px; }
          .stat-card, .resource-card { padding: 18px; }
          .btn-neon { padding: 10px 20px; font-size: 13px; }
          .page { padding: 30px 18px; }
          .empty-state { padding: 40px 20px; }
        }

        @media (max-width: 480px) {
          .nav-links a { padding: 6px 12px; font-size: 12px; }
          .stat-value { font-size: 24px; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo"><i className="fas fa-terminal"></i>MonApp</div>
        <div className="nav-links">
          <Link href="/dashboard" className="active"><i className="fas fa-home"></i> Accueil</Link>
          <Link href="/ressources"><i className="fas fa-box"></i> Ressources</Link>
          <Link href="/developpe-par"><i className="fas fa-code"></i> 👨‍💻</Link>
          <ThemeToggle />
          <button
            onClick={exportCSV}
            className="text-[#5a6a8a] hover:text-[#00f0ff] px-3 py-2 rounded-lg border border-transparent hover:border-[#00f0ff]/10 transition text-sm flex items-center gap-2 font-['Inter',sans-serif]"
          >
            <i className="fas fa-file-export"></i> Export
          </button>
          <form action={logout}><button type="submit" className="text-[#5a6a8a] hover:text-[#ff6b8a] px-3 py-2 rounded-lg border border-transparent hover:border-[#ff6b8a]/10 transition text-sm flex items-center gap-2 font-['Inter',sans-serif]">
            <i className="fas fa-sign-out-alt"></i> Déconnexion
          </button></form>
        </div>
      </nav>

      {/* CONTENU */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="page"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-3xl md:text-4xl font-normal text-[#eef4ff] flex items-center gap-3">
              <span className="text-[#00f0ff] shadow-[0_0_20px_#00f0ff33]">⚡</span>
              Dashboard
            </h1>
            <p className="text-[#5a6a8a] mt-1 flex items-center gap-2">
              <i className="fas fa-user"></i> Bienvenue, <strong className="text-[#eef4ff]">{user?.name || user?.email}</strong>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/ressources/nouveau" className="btn-neon animate-pulseGlow text-sm py-3 px-6">
              <i className="fas fa-plus"></i> Nouvelle ressource
            </Link>
          </motion.div>
        </div>

        {/* STATISTIQUES */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total', value: totalCount, icon: '📦' },
            { label: 'Brouillons', value: draftCount, icon: '✏️' },
            { label: 'Publiées', value: publishedCount, icon: '🚀' },
            { label: 'Taux', value: rate, icon: '⚡', suffix: '%' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="stat-card"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#5a6a8a] text-sm uppercase tracking-wider font-['Inter',sans-serif]">{stat.label}</span>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="stat-value">{stat.value}{stat.suffix || ''}</div>
              <div className="text-xs text-[#34d399] mt-2 flex items-center gap-1">▲ +0%</div>
            </motion.div>
          ))}
        </motion.div>

        {/* RECHERCHE */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5a6a8a]"></i>
            <input
              type="text"
              placeholder="🔍 Rechercher une ressource..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-neon pl-12"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl border transition font-['Inter',sans-serif] text-sm ${
                filter === "all" ? "border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/10" : "border-[#1f2a50] text-[#5a6a8a] hover:border-[#00f0ff]"
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilter("published")}
              className={`px-4 py-2 rounded-xl border transition font-['Inter',sans-serif] text-sm ${
                filter === "published" ? "border-emerald-400 text-emerald-400 bg-emerald-400/10" : "border-[#1f2a50] text-[#5a6a8a] hover:border-emerald-400"
              }`}
            >
              📢 Publiés
            </button>
            <button
              onClick={() => setFilter("draft")}
              className={`px-4 py-2 rounded-xl border transition font-['Inter',sans-serif] text-sm ${
                filter === "draft" ? "border-amber-400 text-amber-400 bg-amber-400/10" : "border-[#1f2a50] text-[#5a6a8a] hover:border-amber-400"
              }`}
            >
              ✏️ Brouillons
            </button>
          </div>
        </div>

        <p className="text-sm text-[#5a6a8a] mb-4 font-['Inter',sans-serif]">
          {filteredResources.length} ressource{filteredResources.length > 1 ? "s" : ""}
          {search && ` pour "${search}"`}
          {filter !== "all" && ` (${filter === "published" ? "publiées" : "brouillons"})`}
        </p>

        {/* LISTE DES RESSOURCES */}
        <AnimatePresence>
          {filteredResources.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="empty-state"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-[#eef4ff] mb-2">
                {search || filter !== "all" ? "Aucun résultat" : "Commencez votre aventure"}
              </h2>
              <p className="text-[#5a6a8a] mb-6">
                {search || filter !== "all" ? "Aucune ressource ne correspond à vos critères" : "Créez votre première ressource et donnez vie à vos idées"}
              </p>
              {!search && filter === "all" && (
                <Link href="/ressources/nouveau" className="btn-neon">
                  <i className="fas fa-plus"></i> Créer ma première ressource
                </Link>
              )}
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {paginatedResources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    variants={itemVariants}
                    className="resource-card"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-[#eef4ff] line-clamp-1">{resource.title}</h3>
                      <span className={resource.published ? "badge-published" : "badge-draft"}>
                        {resource.published ? '📢 Publié' : '✏️ Brouillon'}
                      </span>
                    </div>
                    <p className="text-[#5a6a8a] text-sm line-clamp-2 mb-4">{resource.content}</p>
                    <div className="flex items-center gap-2 text-xs text-[#5a6a8a] mb-4">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{new Date(resource.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/ressources/${resource.id}`} className="flex-1 text-center bg-[#1a1f38] text-[#eef4ff] px-3 py-2 rounded-lg hover:bg-[#1f2a50] transition text-sm font-['Inter',sans-serif] flex items-center justify-center gap-1">
                        <i className="fas fa-eye"></i> Voir
                      </Link>
                      <Link href={`/ressources/${resource.id}/edit`} className="flex-1 text-center bg-[#1a1f38] text-[#b47aff] px-3 py-2 rounded-lg hover:bg-[#1f2a50] transition text-sm font-['Inter',sans-serif] flex items-center justify-center gap-1">
                        <i className="fas fa-edit"></i> Modifier
                      </Link>
                      <DeleteButton id={resource.id} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <Footer />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    </motion.div>
  )
}
