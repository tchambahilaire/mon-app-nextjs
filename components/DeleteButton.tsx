"use client"

import { deleteResource } from "@/actions/resources"
import { useRouter } from "next/navigation"
import { useState } from "react"

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
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="flex-1 text-center bg-[#1a1f38] text-[#ff6b8a] px-3 py-2 rounded-lg hover:bg-[#1f2a50] transition text-sm font-mono flex items-center justify-center gap-1 disabled:opacity-50"
    >
      <i className="fas fa-trash-alt"></i>
      {isLoading ? '...' : 'Supprimer'}
    </button>
  )
}
