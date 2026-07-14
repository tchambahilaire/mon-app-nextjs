"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { signToken } from "@/lib/auth/jwt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const registerSchema = z.object({
  name: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
})

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
})

export async function register(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const validated = registerSchema.parse({ name, email, password })

    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email }
    })

    if (existingUser) {
      return { error: "Cet email est déjà utilisé" }
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10)

    await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword
      }
    })

    return { success: true }
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error
    }
    return { error: error instanceof Error ? error.message : "Erreur lors de l'inscription" }
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const validated = loginSchema.parse({ email, password })

    const user = await prisma.user.findUnique({
      where: { email: validated.email }
    })

    if (!user) {
      return { error: "Email ou mot de passe incorrect" }
    }

    const isValid = await bcrypt.compare(validated.password, user.password)

    if (!isValid) {
      return { error: "Email ou mot de passe incorrect" }
    }

    const token = signToken(user.id, user.email)

    const cookieStore = await cookies()
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/"
    })

    return { success: true }
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error
    }
    return { error: error instanceof Error ? error.message : "Erreur de connexion" }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("token")
  redirect("/")
}
