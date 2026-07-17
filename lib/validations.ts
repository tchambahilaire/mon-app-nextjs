import { z } from 'zod'

// Fonction pour sanitizer les entrées HTML
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Schéma pour les ressources avec sanitization
export const resourceSchema = z.object({
  title: z.string()
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(100, "Le titre ne doit pas dépasser 100 caractères")
    .transform(sanitizeInput),
  content: z.string()
    .min(10, "Le contenu doit contenir au moins 10 caractères")
    .max(5000, "Le contenu ne doit pas dépasser 5000 caractères")
    .transform(sanitizeInput),
  published: z.boolean().optional().default(false),
})

// Schéma pour l'inscription
export const registerSchema = z.object({
  name: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne doit pas dépasser 50 caractères")
    .transform(sanitizeInput),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

// Schéma pour la connexion
export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

// Schéma pour la mise à jour
export const updateResourceSchema = z.object({
  title: z.string()
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(100, "Le titre ne doit pas dépasser 100 caractères")
    .transform(sanitizeInput),
  content: z.string()
    .min(10, "Le contenu doit contenir au moins 10 caractères")
    .max(5000, "Le contenu ne doit pas dépasser 5000 caractères")
    .transform(sanitizeInput),
  published: z.boolean().optional().default(false),
})
