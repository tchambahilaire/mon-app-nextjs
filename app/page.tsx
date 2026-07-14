import Link from 'next/link'
import { auth } from '@/lib/auth/auth'

export default async function Home() {
  const user = await auth()
  const isAuthenticated = !!user

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Bienvenue sur MonApp
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Gérez vos ressources en toute simplicité
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <Link 
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Accéder au Dashboard
            </Link>
          ) : (
            <>
              <Link 
                href="/login"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Se connecter
              </Link>
              <Link 
                href="/register"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
