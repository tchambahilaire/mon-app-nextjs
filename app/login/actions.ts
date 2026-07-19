"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { signToken } from "@/lib/auth/jwt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export async function loginAction(email: string, password: string) {
  console.log("🔑 loginAction called with:", email)
  
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return { error: "Email ou mot de passe incorrect" }
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    return { error: "Email ou mot de passe incorrect" }
  }

  const token = signToken(user.id)

  const cookieStore = await cookies()
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  })

  console.log("✅ Login successful, redirecting...")
  redirect("/dashboard")
}
