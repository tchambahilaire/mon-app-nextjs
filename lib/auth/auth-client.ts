"use client"

import { prisma } from "@/lib/prisma"

export async function getSessionClient() {
  try {
    // Récupérer le token depuis les cookies côté client
    const res = await fetch('/api/auth/session', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!res.ok) {
      return null
    }
    
    const data = await res.json()
    return data.user || null
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}
