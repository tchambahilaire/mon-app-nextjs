"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { signToken } from "@/lib/auth/jwt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { rateLimit } from "@/lib/rate-limit"

const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export async function register(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const validated = registerSchema.parse({ name, email, password })

    const { success } = await rateLimit(`register_${email}`, 5, 60)
    if (!success) {
      return { error: "Trop de tentatives. Veuillez réessayer dans 60 secondes." }
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    })

    if (existingUser) {
      return { error: "Cet email est déjà utilisé" }
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10)

    await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
      },
    })

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0]?.message || "Données invalides"
      return { error: firstError }
    }
    return { error: "Une erreur est survenue lors de l'inscription" }
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const validated = loginSchema.parse({ email, password })

    const { success } = await rateLimit(`login_${email}`, 5, 60)
    if (!success) {
      return { error: "Trop de tentatives. Veuillez réessayer dans 60 secondes." }
    }

    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    })

    if (!user) {
      return { error: "Email ou mot de passe incorrect" }
    }

    const isValid = await bcrypt.compare(validated.password, user.password)

    if (!isValid) {
      return { error: "Email ou mot de passe incorrect" }
    }

    const token = signToken(user.id)

    const cookieStore = await cookies()
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 30,
      path: "/",
    })

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0]?.message || "Données invalides"
      return { error: firstError }
    }
    return { error: "Une erreur est survenue lors de la connexion" }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("token")
  redirect("/")
}
