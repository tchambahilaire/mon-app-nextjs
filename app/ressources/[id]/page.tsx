import { getResource } from "@/actions/resources"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function ResourcePage({ params }: { params: { id: string } }) {
  let resource
  try {
    resource = await getResource(params.id)
  } catch {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#0b0d1a] text-white p-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="text-[#00f0ff] hover:underline">← Retour</Link>
        <h1 className="text-3xl font-bold text-[#00f0ff] mt-4">{resource.title}</h1>
        <p className="text-gray-400 mt-2">{resource.content}</p>
        <p className="text-sm text-gray-500 mt-4">Publié : {resource.published ? "✅ Oui" : "❌ Non"}</p>
      </div>
    </main>
  )
}
