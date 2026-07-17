import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Créer un rate limiter simple en mémoire (pas besoin de Redis pour le dev)
// Pour la production, utilisez Upstash Redis

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

// Rate limiter en mémoire pour le développement
// En production, remplacez par Upstash Redis
const rateLimitStore = new Map<string, { count: number; reset: number }>()

export async function rateLimit(identifier: string, maxRequests: number = 5, windowSeconds: number = 60): Promise<RateLimitResult> {
  const now = Date.now()
  const windowMs = windowSeconds * 1000
  
  const record = rateLimitStore.get(identifier) || { count: 0, reset: now + windowMs }
  
  // Si la fenêtre est expirée, réinitialiser
  if (now > record.reset) {
    record.count = 0
    record.reset = now + windowMs
  }
  
  record.count += 1
  rateLimitStore.set(identifier, record)
  
  const remaining = Math.max(0, maxRequests - record.count)
  const success = record.count <= maxRequests
  
  return {
    success,
    limit: maxRequests,
    remaining,
    reset: Math.floor(record.reset / 1000)
  }
}
