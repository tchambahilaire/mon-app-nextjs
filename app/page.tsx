import Link from "next/link"
import { auth } from "@/lib/auth/auth-server"

export default async function Home() {
  const user = await auth()

  return (
    <main className="min-h-screen bg-[#0b0d1a] flex flex-col items-center justify-center p-4">
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
          text-decoration: none;
          font-family: 'Inter', sans-serif;
        }
        .btn-neon:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 0 60px rgba(0, 240, 255, 0.25);
        }
        .btn-outline {
          background: transparent;
          border: 1.5px solid rgba(0, 240, 255, 0.3);
          color: #00f0ff;
          padding: 14px 40px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.4s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
        }
        .btn-outline:hover {
          background: #00f0ff;
          color: #080a1a;
          box-shadow: 0 0 60px rgba(0, 240, 255, 0.25);
          transform: translateY(-3px);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="text-center">
        <div className="text-7xl md:text-8xl mb-6 animate-float">⚡</div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="bg-gradient-to-r from-[#00f0ff] to-[#b47aff] bg-clip-text text-transparent font-['Orbitron',monospace]">
            MonApp
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-[#5a6a8a] mb-8 font-['Inter',sans-serif]">
          Gérez vos ressources en toute simplicité
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          {user ? (
            <Link href="/dashboard" className="btn-neon">
              <i className="fas fa-home"></i> Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn-neon">
                <i className="fas fa-sign-in-alt"></i> Se connecter
              </Link>
              <Link href="/register" className="btn-outline">
                <i className="fas fa-user-plus"></i> S'inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
