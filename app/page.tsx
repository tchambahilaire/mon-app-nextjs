import Link from "next/link"
import { getSession } from "@/lib/auth/auth-server"

export default async function Home() {
  const user = await getSession()
  const isAuthenticated = !!user

  return (
    <div className="min-h-screen bg-[#0b0d1a] text-[#d0d6f0] font-['Courier_New',monospace] flex items-center justify-center p-4">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 30px #00f0ff22, inset 0 0 30px #00f0ff08; }
          50% { box-shadow: 0 0 60px #00f0ff44, inset 0 0 60px #00f0ff15; }
        }
        
        .hero-icon {
          font-size: 72px;
          display: block;
          animation: float 5s ease-in-out infinite;
          filter: drop-shadow(0 0 40px rgba(0, 240, 255, 0.15));
        }
        
        .title {
          font-size: 44px;
          font-weight: 400;
          color: #eef4ff;
          text-shadow: 0 0 30px #00f0ff22;
        }
        .title span {
          color: #00f0ff;
          text-shadow: 0 0 20px #00f0ff88, 0 0 60px #00f0ff33;
        }
        
        .subtitle {
          font-size: 18px;
          color: #8892b0;
          max-width: 500px;
          margin: 0 auto;
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
        
        .home-container {
          animation: fadeIn 0.4s ease;
          text-align: center;
          max-width: 800px;
          padding: 40px 20px;
        }
        
        .home-buttons {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 30px;
        }
        
        @media (max-width: 700px) {
          .title {
            font-size: 30px;
          }
          .hero-icon {
            font-size: 56px;
          }
          .btn-neon {
            width: 100%;
            justify-content: center;
          }
          .home-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
        
        @media (max-width: 400px) {
          .title {
            font-size: 24px;
          }
          .subtitle {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="home-container">
        <span className="hero-icon">⚡</span>
        <h1 className="title">
          Bienvenue sur <span>MonApp</span>
        </h1>
        <p className="subtitle">
          Gérez vos ressources en toute simplicité
        </p>
        <div className="home-buttons">
          {isAuthenticated ? (
            <Link href="/dashboard" className="btn-neon">
              <i className="fas fa-arrow-right"></i> Accéder au Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn-neon">
                <i className="fas fa-sign-in-alt"></i> Se connecter
              </Link>
              <Link href="/register" className="btn-neon btn-neon-secondary">
                <i className="fas fa-user-plus"></i> S'inscrire
              </Link>
            </>
          )}
        </div>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    </div>
  )
}
