import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'mon-secret-super-securise'

export function signToken(userId: string, email: string) {
  console.log("🔐 Signing token for:", email)
  return jwt.sign({ userId, email }, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET) as { userId: string; email: string }
    console.log("✅ Token verified for:", decoded.email)
    return decoded
  } catch (error) {
    console.log("❌ Token verification failed:", error)
    return null
  }
}
