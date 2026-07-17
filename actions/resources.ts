"use server"

import { getSession } from "@/lib/auth/auth-server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const resourceSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  content: z.string().min(10, "Le contenu doit contenir au moins 10 caractères"),
  published: z.boolean().optional().default(false),
})

// CREATE
export async function createResource(formData: FormData) {
  const user = await getSession()
  if (!user) throw new Error("Non authentifié")

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "on"

  const validated = resourceSchema.parse({ title, content, published })

  await prisma.resource.create({
    data: {
      title: validated.title,
      content: validated.content,
      published: validated.published,
      userId: user.id
    }
  })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

// READ (liste)
export async function getResources() {
  const user = await getSession()
  if (!user) return []

  return await prisma.resource.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }
  })
}

// READ (détail)
export async function getResource(id: string) {
  const user = await getSession()
  if (!user) throw new Error("Non authentifié")

  const resource = await prisma.resource.findUnique({
    where: { id }
  })

  if (!resource) throw new Error("Ressource non trouvée")
  if (resource.userId !== user.id) throw new Error("Accès non autorisé")

  return resource
}

// UPDATE
export async function updateResource(id: string, formData: FormData) {
  const user = await getSession()
  if (!user) throw new Error("Non authentifié")

  const resource = await prisma.resource.findUnique({ where: { id } })
  if (!resource || resource.userId !== user.id) throw new Error("Accès non autorisé")

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "on"

  const validated = resourceSchema.parse({ title, content, published })

  await prisma.resource.update({
    where: { id },
    data: {
      title: validated.title,
      content: validated.content,
      published: validated.published
    }
  })

  revalidatePath("/dashboard")
  revalidatePath(`/ressources/${id}`)
  redirect("/dashboard")
}

// DELETE
export async function deleteResource(id: string) {
  const user = await getSession()
  if (!user) throw new Error("Non authentifié")

  const resource = await prisma.resource.findUnique({ where: { id } })
  if (!resource || resource.userId !== user.id) throw new Error("Accès non autorisé")

  await prisma.resource.delete({ where: { id } })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}
