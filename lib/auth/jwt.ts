import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'mon-secret-super-securise'

// 30 minutes en production, 7 jours en développement
const EXPIRES_IN = process.env.NODE_ENV === 'production' ? '30m' : '7d'

export function signToken(userId: string) {
  return jwt.sign({ userId }, SECRET, { expiresIn: EXPIRES_IN })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { userId: string }
  } catch {
    return null
  }
}
