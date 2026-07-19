import { getResource } from "@/actions/resources"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ResourcePage({ params }: PageProps) {
  const { id } = await params

  let resource
  try {
    resource = await getResource(id)
  } catch {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#0b0d1a] text-white p-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="text-[#00f0ff] hover:underline inline-flex items-center gap-2">
          ← Retour
        </Link>
        <div className="mt-6 bg-[#1a1f38] p-8 rounded-2xl border border-gray-700">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-[#00f0ff]">{resource.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm ${
              resource.published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
            }`}>
              {resource.published ? "✅ Publié" : "✏️ Brouillon"}
            </span>
          </div>
          <p className="text-gray-300 mt-4 whitespace-pre-wrap leading-relaxed">{resource.content}</p>
          <div className="mt-6 pt-4 border-t border-gray-700 flex gap-4">
            <Link href={`/ressources/${resource.id}/edit`} className="text-yellow-400 hover:text-yellow-300 transition">
              ✏️ Modifier
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
