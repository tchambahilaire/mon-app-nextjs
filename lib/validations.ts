import { z } from 'zod'

export const resourceSchema = z.object({
  title: z.string().min(3, "Le titre doit faire au moins 3 caractères"),
  content: z.string().min(10, "Le contenu doit faire au moins 10 caractères"),
  published: z.boolean().optional().default(false),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
})

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
})
