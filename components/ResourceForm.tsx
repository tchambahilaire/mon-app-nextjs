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
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Titre *
        </label>
        <input
          type="text"
          name="title"
          defaultValue={initialData?.title}
          required
          placeholder="Donnez un titre à votre ressource"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Contenu *
        </label>
        <textarea
          name="content"
          defaultValue={initialData?.content}
          required
          rows={6}
          placeholder="Écrivez votre contenu ici..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="published"
          id="published"
          defaultChecked={initialData?.published || false}
          className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
        />
        <label htmlFor="published" className="text-sm text-slate-700">
          Publier immédiatement
        </label>
      </div>
      
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 btn-gradient text-white px-6 py-3 rounded-xl font-medium disabled:opacity-50 shadow-lg"
        >
          {isLoading ? 'Enregistrement...' : initialData ? 'Mettre à jour' : '✨ Créer la ressource'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}
