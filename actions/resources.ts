"use server"

import { getSession } from "@/lib/auth/auth-server"
import { prisma } from "@/lib/prisma"
import { resourceSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { logInfo, logError, logWarn } from "@/lib/logger"

// CREATE
export async function createResource(formData: FormData) {
  const user = await getSession()
  if (!user) {
    logWarn("Tentative de création sans authentification")
    throw new Error("Non authentifié")
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "on"

  logInfo(`Création d'une ressource par ${user.email}`, { title })

  try {
    const validated = resourceSchema.parse({ title, content, published })

    await prisma.resource.create({
      data: {
        title: validated.title,
        content: validated.content,
        published: validated.published,
        userId: user.id
      }
    })

    logInfo(`Ressource créée avec succès par ${user.email}`, { title })
    revalidatePath("/dashboard")
    redirect("/dashboard")
  } catch (error) {
    logError(`Erreur lors de la création de ressource par ${user.email}`, error)
    throw error
  }
}

// READ (liste)
export async function getResources() {
  const user = await getSession()
  if (!user) {
    logWarn("Tentative de récupération des ressources sans authentification")
    return []
  }

  logInfo(`Récupération des ressources pour ${user.email}`)

  try {
    return await prisma.resource.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" }
    })
  } catch (error) {
    logError(`Erreur lors de la récupération des ressources pour ${user.email}`, error)
    throw error
  }
}

// READ (détail)
export async function getResource(id: string) {
  const user = await getSession()
  if (!user) {
    logWarn("Tentative de récupération d'une ressource sans authentification")
    throw new Error("Non authentifié")
  }

  logInfo(`Récupération de la ressource ${id} par ${user.email}`)

  try {
    const resource = await prisma.resource.findUnique({
      where: { id }
    })

    if (!resource) {
      logWarn(`Ressource ${id} non trouvée`)
      throw new Error("Ressource non trouvée")
    }

    if (resource.userId !== user.id) {
      logWarn(`Accès non autorisé à la ressource ${id} par ${user.email}`)
      throw new Error("Accès non autorisé")
    }

    return resource
  } catch (error) {
    logError(`Erreur lors de la récupération de la ressource ${id}`, error)
    throw error
  }
}

// UPDATE
export async function updateResource(id: string, formData: FormData) {
  const user = await getSession()
  if (!user) {
    logWarn("Tentative de modification sans authentification")
    throw new Error("Non authentifié")
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "on"

  logInfo(`Modification de la ressource ${id} par ${user.email}`, { title })

  try {
    const resource = await prisma.resource.findUnique({ where: { id } })
    if (!resource || resource.userId !== user.id) {
      logWarn(`Accès non autorisé à la ressource ${id} par ${user.email}`)
      throw new Error("Accès non autorisé")
    }

    const validated = resourceSchema.parse({ title, content, published })

    await prisma.resource.update({
      where: { id },
      data: {
        title: validated.title,
        content: validated.content,
        published: validated.published
      }
    })

    logInfo(`Ressource ${id} modifiée avec succès par ${user.email}`)
    revalidatePath("/dashboard")
    revalidatePath(`/ressources/${id}`)
    redirect("/dashboard")
  } catch (error) {
    logError(`Erreur lors de la modification de la ressource ${id}`, error)
    throw error
  }
}

// DELETE
export async function deleteResource(id: string) {
  const user = await getSession()
  if (!user) {
    logWarn("Tentative de suppression sans authentification")
    throw new Error("Non authentifié")
  }

  logInfo(`Suppression de la ressource ${id} par ${user.email}`)

  try {
    const resource = await prisma.resource.findUnique({ where: { id } })
    if (!resource || resource.userId !== user.id) {
      logWarn(`Accès non autorisé à la ressource ${id} par ${user.email}`)
      throw new Error("Accès non autorisé")
    }

    await prisma.resource.delete({ where: { id } })

    logInfo(`Ressource ${id} supprimée avec succès par ${user.email}`)
    revalidatePath("/dashboard")
    redirect("/dashboard")
  } catch (error) {
    logError(`Erreur lors de la suppression de la ressource ${id}`, error)
    throw error
  }
}
