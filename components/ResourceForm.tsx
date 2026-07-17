"use client"

import { createResource, updateResource } from "@/actions/resources"
import { useRouter } from "next/navigation"
import { useState, useCallback } from "react"
import toast from "react-hot-toast"

interface ResourceFormProps {
  initialData?: {
    id: string
    title: string
    content: string
    published: boolean
  }
}

interface ValidationErrors {
  title?: string
  content?: string
}

export default function ResourceForm({ initialData }: ResourceFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState(initialData?.title || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [published, setPublished] = useState(initialData?.published || false)
  const [errors, setErrors] = useState<ValidationErrors>({})

  const validate = useCallback(() => {
    const newErrors: ValidationErrors = {}

    if (title.length < 3) {
      newErrors.title = "Le titre doit contenir au moins 3 caractères"
    } else if (title.length > 100) {
      newErrors.title = "Le titre ne doit pas dépasser 100 caractères"
    }

    if (content.length < 10) {
      newErrors.content = "Le contenu doit contenir au moins 10 caractères"
    } else if (content.length > 5000) {
      newErrors.content = "Le contenu ne doit pas dépasser 5000 caractères"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [title, content])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    validate()
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    validate()
  }

  const handleSubmit = async (formData: FormData) => {
    if (!validate()) {
      toast.error("❌ Veuillez corriger les erreurs du formulaire")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      if (initialData) {
        await updateResource(initialData.id, formData)
        toast.success("✅ Ressource modifiée avec succès !")
      } else {
        await createResource(formData)
        toast.success("✅ Ressource créée avec succès !")
      }
      router.push("/dashboard")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue"
      setError(message)
      toast.error("❌ " + message)
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
          value={title}
          onChange={handleTitleChange}
          required
          placeholder="Donnez un titre à votre ressource"
          className={`w-full bg-[#10152b] border ${
            errors.title ? "border-red-500" : "border-[#1f2a50]"
          } rounded-xl px-4 py-3 text-[#d0d6f0] outline-none focus:border-[#00f0ff] transition`}
        />
        {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
        <div className="flex justify-end text-xs text-[#6a7aaa] mt-1">{title.length}/100</div>
      </div>

      <div>
        <label className="text-sm text-[#8892b0] uppercase tracking-wider">Contenu *</label>
        <textarea
          name="content"
          value={content}
          onChange={handleContentChange}
          required
          rows={6}
          placeholder="Écrivez votre contenu ici..."
          className={`w-full bg-[#10152b] border ${
            errors.content ? "border-red-500" : "border-[#1f2a50]"
          } rounded-xl px-4 py-3 text-[#d0d6f0] outline-none focus:border-[#00f0ff] resize-none transition`}
        />
        {errors.content && <p className="text-red-400 text-sm mt-1">{errors.content}</p>}
        <div className="flex justify-end text-xs text-[#6a7aaa] mt-1">
          {content.length}/5000
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="published"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-5 h-5 accent-[#00f0ff]"
        />
        <label htmlFor="published" className="text-sm text-[#8892b0]">
          Publier immédiatement
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading || !!errors.title || !!errors.content}
          className="flex-1 bg-transparent border-2 border-[#00f0ff] text-[#00f0ff] px-6 py-3 rounded-full font-mono uppercase hover:bg-[#00f0ff] hover:text-[#0b0d1a] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "⏳ Enregistrement..." : initialData ? "✏️ Mettre à jour" : "✨ Créer"}
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
