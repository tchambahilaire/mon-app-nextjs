"use client"

import { createResource, updateResource } from "@/actions/resources"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface ResourceFormProps {
  initialData?: {
    id: string
    title: string
    content: string
    published: boolean
  }
}

export default function ResourceForm({ initialData }: ResourceFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      if (initialData) {
        await updateResource(initialData.id, formData)
      } else {
        await createResource(formData)
      }
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
          ❌ {error}
        </div>
      )}
      
      <div>
        <label className="text-sm text-[#8892b0] uppercase tracking-wider">Titre *</label>
        <input
          type="text"
          name="title"
          defaultValue={initialData?.title}
          required
          placeholder="Donnez un titre à votre ressource"
          className="w-full bg-[#10152b] border border-[#1f2a50] rounded-xl px-4 py-3 text-[#d0d6f0] outline-none focus:border-[#00f0ff]"
        />
      </div>
      
      <div>
        <label className="text-sm text-[#8892b0] uppercase tracking-wider">Contenu *</label>
        <textarea
          name="content"
          defaultValue={initialData?.content}
          required
          rows={6}
          placeholder="Écrivez votre contenu ici..."
          className="w-full bg-[#10152b] border border-[#1f2a50] rounded-xl px-4 py-3 text-[#d0d6f0] outline-none focus:border-[#00f0ff] resize-none"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="published"
          id="published"
          defaultChecked={initialData?.published || false}
          className="w-5 h-5 accent-[#00f0ff]"
        />
        <label htmlFor="published" className="text-sm text-[#8892b0]">
          Publier immédiatement
        </label>
      </div>
      
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-transparent border-2 border-[#00f0ff] text-[#00f0ff] px-6 py-3 rounded-full font-mono uppercase hover:bg-[#00f0ff] hover:text-[#0b0d1a] transition disabled:opacity-50"
        >
          {isLoading ? '⏳ Enregistrement...' : initialData ? '✏️ Mettre à jour' : '✨ Créer'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-full border-2 border-[#ff6b8a] text-[#ff6b8a] hover:bg-[#ff6b8a] hover:text-[#0b0d1a] transition"
        >
          ❌ Annuler
        </button>
      </div>
    </form>
  )
}
