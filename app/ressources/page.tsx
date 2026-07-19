import { getResources } from "@/actions/resources"
import Link from "next/link"

export default async function RessourcesPage() {
  const resources = await getResources()

  return (
    <main className="min-h-screen bg-[#0b0d1a] text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#00f0ff]">📄 Mes ressources</h1>
          <Link href="/ressources/nouveau" className="px-4 py-2 bg-[#00f0ff] text-black rounded-lg font-bold hover:scale-105 transition">
            + Nouvelle
          </Link>
        </div>
        {resources.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-gray-700 rounded-lg">
            <p className="text-gray-400">Aucune ressource</p>
            <Link href="/ressources/nouveau" className="text-[#00f0ff] hover:underline">Créer votre première ressource</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {resources.map((r) => (
              <div key={r.id} className="border border-gray-700 rounded-lg p-4 hover:border-[#00f0ff] transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-[#eef4ff]">{r.title}</h2>
                    <p className="text-gray-400 mt-1">{r.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {r.published ? "✅ Publié" : "✏️ Brouillon"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/ressources/${r.id}`} className="text-blue-400 hover:text-blue-300 transition">Voir</Link>
                    <Link href={`/ressources/${r.id}/edit`} className="text-yellow-400 hover:text-yellow-300 transition">Modifier</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
