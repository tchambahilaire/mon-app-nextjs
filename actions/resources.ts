"use server"

import { getSession } from "@/lib/auth/auth-server"
import { prisma } from "@/lib/prisma"
import { resourceSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// CREATE
export async function createResource(formData: FormData) {
  const user = await getSession()
  
  if (!user?.id) {
    throw new Error("Non authentifié")
  }

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const published = formData.get('published') === 'on'

  const result = resourceSchema.safeParse({ title, content, published })
  
  if (!result.success) {
    const errorMessage = result.error.issues?.[0]?.message || "Données invalides"
    throw new Error(errorMessage)
  }

  await prisma.resource.create({
    data: {
      title: result.data.title,
      content: result.data.content,
      published: result.data.published,
      userId: user.id
    }
  })

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

// READ (list)
export async function getResources() {
  const user = await getSession()
  
  if (!user?.id) {
    return []
  }

  return await prisma.resource.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      createdAt: true,
      updatedAt: true
    }
  })
}

// READ (detail)
export async function getResource(id: string) {
  const user = await getSession()
  
  if (!user?.id) {
    throw new Error("Non authentifié")
  }

  const resource = await prisma.resource.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      createdAt: true,
      updatedAt: true,
      userId: true
    }
  })

  if (!resource) {
    throw new Error("Ressource non trouvée")
  }

  if (resource.userId !== user.id) {
    throw new Error("Accès non autorisé")
  }

  return resource
}

// UPDATE
export async function updateResource(id: string, formData: FormData) {
  const user = await getSession()
  
  if (!user?.id) {
    throw new Error("Non authentifié")
  }

  const existingResource = await prisma.resource.findUnique({
    where: { id },
    select: { userId: true }
  })

  if (!existingResource || existingResource.userId !== user.id) {
    throw new Error("Accès non autorisé")
  }

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const published = formData.get('published') === 'on'

  const result = resourceSchema.safeParse({ title, content, published })
  
  if (!result.success) {
    const errorMessage = result.error.issues?.[0]?.message || "Données invalides"
    throw new Error(errorMessage)
  }

  await prisma.resource.update({
    where: { id },
    data: {
      title: result.data.title,
      content: result.data.content,
      published: result.data.published
    }
  })

  revalidatePath('/dashboard')
  revalidatePath(`/ressources/${id}`)
  redirect('/dashboard')
}

// DELETE
export async function deleteResource(id: string) {
  const user = await getSession()
  
  if (!user?.id) {
    throw new Error("Non authentifié")
  }

  const existingResource = await prisma.resource.findUnique({
    where: { id },
    select: { userId: true }
  })

  if (!existingResource || existingResource.userId !== user.id) {
    throw new Error("Accès non autorisé")
  }

  await prisma.resource.delete({
    where: { id }
  })

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
