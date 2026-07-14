import { getSession } from "@/lib/auth/auth-server"
import { getResources } from "@/actions/resources"
import Link from "next/link"
import { redirect } from "next/navigation"
import { logout } from "@/actions/auth"
import { DeleteButton } from "@/components/DeleteButton"

export default async function CyberpunkDashboard() {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
  }

  const resources = await getResources()
  const publishedCount = resources.filter(r => r.published).length
  const draftCount = resources.filter(r => !r.published).length
  const totalCount = resources.length
  const rate = totalCount ? Math.round((publishedCount / totalCount) * 100) : 0

  return (
    <div className="min-h-screen bg-[#0b0d1a] text-slate-200 font-['Inter',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        
        .font-orbitron {
          font-family: 'Orbitron', monospace;
        }
        
        .text-gradient {
          background: linear-gradient(90deg, #00f0ff, #b300ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .btn-neon {
          background: linear-gradient(135deg, #00f0ff, #b300ff);
          box-shadow: 0 0 40px rgba(0, 240, 255, 0.3), 0 0 80px rgba(179, 0, 255, 0.15);
          transition: all 0.3s ease;
        }
        
        .btn-neon:hover {
          transform: scale(1.03) translateY(-2px);
          box-shadow: 0 0 60px rgba(0, 240, 255, 0.5), 0 0 120px rgba(179, 0, 255, 0.25);
        }
        
        .stat-card {
          background: rgba(15, 18, 36, 0.7);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(0, 255, 255, 0.08);
          border-radius: 24px;
          padding: 24px 22px;
          transition: 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .stat-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #00f0ff, #b300ff, #00f0ff);
          background-size: 200% 100%;
          animation: shimmer-border 4s linear infinite;
          opacity: 0.5;
        }
        
        @keyframes shimmer-border {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        
        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 255, 255, 0.2);
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 255, 255, 0.03);
        }
        
        .stat-value {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 32px;
          background: linear-gradient(135deg, #f0faff, #a5f3fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .stat-trend {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #34d399;
          background: rgba(52, 211, 153, 0.08);
          padding: 4px 14px;
          border-radius: 40px;
          border: 1px solid rgba(52, 211, 153, 0.15);
        }
        
        .empty-state {
          background: rgba(15, 18, 36, 0.5);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(0, 255, 255, 0.06);
          border-radius: 48px;
          padding: 72px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .empty-state::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 40%, rgba(0, 255, 255, 0.03) 0%, transparent 60%),
                      radial-gradient(circle at 70% 60%, rgba(179, 0, 255, 0.03) 0%, transparent 50%);
          animation: rotate-glow 30s linear infinite;
          pointer-events: none;
        }
        
        @keyframes rotate-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .empty-content {
          position: relative;
          z-index: 2;
        }
        
        .empty-illustration {
          font-size: 92px;
          display: block;
          animation: float 5s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        
        .sidebar {
          background: rgba(11, 13, 26, 0.85);
          backdrop-filter: blur(12px);
          border-right: 1px solid rgba(0, 255, 255, 0.25);
          box-shadow: 8px 0 40px rgba(0, 255, 255, 0.08);
        }
      `}</style>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="sidebar w-64 lg:w-72 fixed inset-y-0 left-0 p-6 hidden lg:block">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-[#0b0d1a] shadow-[0_0_30px_rgba(0,240,255,0.3)] font-orbitron">
              ◈
            </div>
            <span className="font-orbitron font-bold text-2xl text-gradient">
              Neon Console
            </span>
          </div>

          <nav className="space-y-2">
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-cyan-400/10 text-cyan-400 border-l-2 border-cyan-400 font-semibold">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12L5 10M5 10L12 5L19 10M5 10V19C5 19.5523 5.44772 20 6 20H9M19 10L21 12M19 10V19C19 19.5523 18.5523 20 18 20H15M9 20V15C9 14.4477 9.44772 14 10 14H14C14.5523 14 15 14.4477 15 15V20M9 20H15"/></svg>
              Dashboard
            </div>
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"/><path d="M7 7H17M7 12H14M7 17H10"/></svg>
              Ressources
              <span className="ml-auto bg-cyan-400/20 text-cyan-400 px-2 py-0.5 rounded-full text-xs font-bold border border-cyan-400/30">{totalCount}</span>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12C21 13.2 20.5 14.2 19.7 14.9C18.9 15.6 17.8 16 16.5 16C15.2 16 14.1 15.6 13.3 14.9C12.5 14.2 12 13.2 12 12C12 10.8 12.5 9.8 13.3 9.1C14.1 8.4 15.2 8 16.5 8C17.8 8 18.9 8.4 19.7 9.1C20.5 9.8 21 10.8 21 12Z"/><path d="M3 12V8C3 5.8 4.8 4 7 4H11M3 12L5 10M3 12L5 14"/></svg>
              Analytics
            </div>
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 15V21M12 3V9M9 12H15M6 6L8 8M18 18L16 16M6 18L8 16M18 6L16 8"/></svg>
              Paramètres
            </div>
          </nav>

          <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-cyan-400/10 flex items-center gap-3 text-sm text-slate-500">
            <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_16px_#00f0ff] animate-pulse"></span>
            SYSTEM · ONLINE
          </div>
        </aside>

        {/* Contenu principal */}
        <div className="flex-1 lg:ml-72 p-6 lg:p-10">
          {/* Header */}
          <div className="flex justify-between items-center pb-6 border-b border-cyan-400/10 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <h1 className="font-orbitron text-2xl font-bold bg-gradient-to-r from-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <span className="text-sm text-slate-500 bg-cyan-400/5 px-3 py-1 rounded-full border border-cyan-400/10">
                v2.0 · neon
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="relative w-11 h-11 flex items-center justify-center rounded-full bg-cyan-400/5 border border-cyan-400/10 hover:bg-cyan-400/10 transition">
                <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"/><path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9953 21.7295C12.6886 21.9044 12.3388 21.9965 11.984 21.9965C11.6291 21.9965 11.2794 21.9044 10.9727 21.7295C10.6661 21.5547 10.4138 21.3031 10.238 21"/></svg>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-pink-500 rounded-full shadow-[0_0_20px_#ff2d75] animate-pulse"></span>
              </div>
              <div className="flex items-center gap-3 px-2 py-1 pr-5 rounded-full bg-cyan-400/5 border border-cyan-400/10 hover:border-cyan-400/30 transition">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-[#0b0d1a] font-bold shadow-[0_0_30px_rgba(0,240,255,0.2)] font-orbitron">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="font-semibold text-sm">{user?.name || 'Utilisateur'}</span>
              </div>
              <form action={logout}>
                <button className="bg-red-500/80 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition text-sm font-medium">
                  Déconnexion
                </button>
              </form>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              { label: 'Total', value: totalCount, icon: '📦' },
              { label: 'Brouillons', value: draftCount, icon: '✏️' },
              { label: 'Publiées', value: publishedCount, icon: '🚀' },
              { label: 'Taux', value: rate, icon: '⚡', suffix: '%' }
            ].map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.label}</span>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="stat-value">{stat.value}{stat.suffix || ''}</div>
                <div className="stat-trend">▲ +0%</div>
              </div>
            ))}
          </div>

          {/* CTA Neon */}
          <div className="mt-8 flex justify-end">
            <Link
              href="/ressources/nouveau"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-orbitron font-bold text-sm uppercase text-[#0b0d1a] btn-neon border border-white/15"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5V19M5 12H19"/></svg>
              Nouvelle ressource
            </Link>
          </div>

          {/* Empty State */}
          <div className="empty-state mt-10">
            <div className="empty-content">
              <span className="empty-illustration">⚡</span>
              <h2 className="font-orbitron text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-100 to-cyan-300 bg-clip-text text-transparent mb-3">
                Créez votre première ressource
              </h2>
              <p className="text-slate-400 text-lg max-w-lg mx-auto">
                Donnez vie à vos idées dans l'écosystème <span className="text-cyan-400 font-semibold">Neon Console</span>.<br />
                Commencez dès maintenant avec un design cyberpunk et une performance fulgurante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
