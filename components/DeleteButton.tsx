"use client"

import { deleteResource } from "@/actions/resources"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from 'react-hot-toast'

export function DeleteButton({ id }: { id: string }) {
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
      className="flex-1 text-center bg-[#1a1f38] text-[#ff6b8a] px-3 py-2 rounded-lg hover:bg-[#ff6b8a]/10 transition text-sm font-['Inter',sans-serif] flex items-center justify-center gap-1 disabled:opacity-50 border border-[#ff6b8a]/20 hover:border-[#ff6b8a]/50"
    >
      <i className="fas fa-trash-alt"></i>
      {isLoading ? '...' : 'Supprimer'}
    </button>
  )
}
