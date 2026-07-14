"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export async function registerAction(name: string, email: string, password: string) {
  console.log("📝 registerAction called with:", email)

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return { error: "Cet email est déjà utilisé" }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  console.log("✅ User created, redirecting...")
  redirect("/login?registered=true")
}
