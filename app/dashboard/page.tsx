import { getSession } from "@/lib/auth/auth-server"
import { getResources } from "@/actions/resources"
import Link from "next/link"
import { redirect } from "next/navigation"
import { logout } from "@/actions/auth"

export default async function DashboardPage() {
  const user = await getSession()
  if (!user) redirect("/login")

  const resources = await getResources()

  return (
    <main className="min-h-screen bg-[#0b0d1a] text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#00f0ff]">Dashboard</h1>
          <div className="flex gap-3">
            <Link href="/ressources/nouveau" className="px-4 py-2 bg-[#00f0ff] text-black rounded-lg font-bold">
              + Nouvelle ressource
            </Link>
            <form action={logout}>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Déconnexion</button>
            </form>
          </div>
        </div>

        {resources.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-gray-700 rounded-lg">
            <p className="text-gray-400">Aucune ressource</p>
            <Link href="/ressources/nouveau" className="text-[#00f0ff] hover:underline">Créer votre première ressource</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {resources.map((r) => (
              <div key={r.id} className="border border-gray-700 rounded-lg p-4">
                <h2 className="text-xl font-bold">{r.title}</h2>
                <p className="text-gray-400">{r.content}</p>
                <div className="flex gap-2 mt-2">
                  <Link href={`/ressources/${r.id}`} className="text-blue-400">Voir</Link>
                  <Link href={`/ressources/${r.id}/edit`} className="text-yellow-400">Modifier</Link>
                  <form action={async () => {
                    "use server"
                    const { deleteResource } = await import("@/actions/resources")
                    await deleteResource(r.id)
                  }}>
                    <button className="text-red-400">Supprimer</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
