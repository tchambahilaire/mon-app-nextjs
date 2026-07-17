"use client"

import { deleteResource } from "@/actions/resources"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from 'react-hot-toast'

interface DeleteButtonProps {
  id: string
}

export function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
      return
    }

    setIsLoading(true)
    try {
      await deleteResource(id)
      toast.success('🗑️ Ressource supprimée avec succès !')
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
      toast.error('❌ Erreur lors de la suppression')
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      aria-label="Supprimer la ressource"
      role="button"
      tabIndex={0}
      className="flex-1 text-center bg-[#1a1f38] text-[#ff6b8a] px-3 py-2 rounded-lg hover:bg-[#1f2a50] transition text-sm font-mono flex items-center justify-center gap-1 disabled:opacity-50"
    >
      🗑️ {isLoading ? '...' : 'Supprimer'}
    </button>
  )
}
