import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0d1a] text-white p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-[#00f0ff] mb-4">MonApp</h1>
        <p className="text-xl text-gray-400 mb-8">Gérez vos ressources en toute simplicité</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/login" className="px-6 py-3 bg-[#00f0ff] text-black rounded-full font-bold hover:scale-105 transition">
            Se connecter
          </Link>
          <Link href="/register" className="px-6 py-3 bg-transparent border-2 border-[#00f0ff] text-[#00f0ff] rounded-full font-bold hover:bg-[#00f0ff] hover:text-black transition">
            S'inscrire
          </Link>
        </div>
      </div>
    </main>
  )
}
