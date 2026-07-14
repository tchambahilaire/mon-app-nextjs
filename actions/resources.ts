"use server"

import { getSession } from "@/lib/auth/auth-server"
import { prisma } from "@/lib/prisma"
import { resourceSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

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
    throw new Error(result.error.errors[0].message)
  }

  await prisma.resource.create({
    data: {
      title,
      content,
      published,
      userId: user.id
    }
  })

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function getResources() {
  const user = await getSession()
  
  if (!user?.id) {
    return []
  }

  return await prisma.resource.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getResource(id: string) {
  const user = await getSession()
  
  if (!user?.id) {
    throw new Error("Non authentifié")
  }

  const resource = await prisma.resource.findUnique({
    where: { id }
  })

  if (!resource) {
    throw new Error("Ressource non trouvée")
  }

  if (resource.userId !== user.id) {
    throw new Error("Accès non autorisé")
  }

  return resource
}

export async function updateResource(id: string, formData: FormData) {
  const user = await getSession()
  
  if (!user?.id) {
    throw new Error("Non authentifié")
  }

  const existingResource = await prisma.resource.findUnique({
    where: { id }
  })

  if (!existingResource || existingResource.userId !== user.id) {
    throw new Error("Accès non autorisé")
  }

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const published = formData.get('published') === 'on'

  const result = resourceSchema.safeParse({ title, content, published })
  
  if (!result.success) {
    throw new Error(result.error.errors[0].message)
  }

  await prisma.resource.update({
    where: { id },
    data: { title, content, published }
  })

  revalidatePath('/dashboard')
  revalidatePath(`/ressources/${id}`)
  redirect('/dashboard')
}

export async function deleteResource(id: string) {
  const user = await getSession()
  
  if (!user?.id) {
    throw new Error("Non authentifié")
  }

  const existingResource = await prisma.resource.findUnique({
    where: { id }
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
