import { getResource, updateResource } from "@/actions/resources"
import { redirect } from "next/navigation"
import Link from "next/link"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditResourcePage({ params }: PageProps) {
  const { id } = await params

  let resource
  try {
    resource = await getResource(id)
  } catch {
    redirect("/dashboard")
  }

  async function handleUpdate(formData: FormData) {
    "use server"
    await updateResource(id, formData)
  }

  return (
    <main className="min-h-screen bg-[#0b0d1a] text-white p-4">
      <div className="max-w-2xl mx-auto">
        <Link href={`/ressources/${id}`} className="text-[#00f0ff] hover:underline inline-flex items-center gap-2">
          ← Retour
        </Link>
        <div className="mt-6 bg-[#1a1f38] p-8 rounded-2xl border border-gray-700">
          <h1 className="text-2xl font-bold text-[#00f0ff] mb-6">✏️ Modifier la ressource</h1>
          <form action={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Titre *</label>
              <input
                type="text"
                name="title"
                defaultValue={resource.title}
                required
                className="w-full p-3 rounded-lg bg-[#0b0d1a] border border-gray-700 text-white focus:border-[#00f0ff] outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Contenu *</label>
              <textarea
                name="content"
                defaultValue={resource.content}
                required
                rows={6}
                className="w-full p-3 rounded-lg bg-[#0b0d1a] border border-gray-700 text-white focus:border-[#00f0ff] outline-none transition resize-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="published"
                id="published"
                defaultChecked={resource.published}
                className="w-5 h-5 accent-[#00f0ff]"
              />
              <label htmlFor="published" className="text-gray-300">Publier immédiatement</label>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#00f0ff] text-black font-bold py-3 rounded-lg hover:scale-105 transition"
              >
                💾 Modifier
              </button>
              <Link
                href="/dashboard"
                className="flex-1 border border-gray-600 text-gray-400 py-3 rounded-lg text-center hover:bg-gray-800 transition"
              >
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
