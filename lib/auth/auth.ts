// Ce fichier est maintenant un point d'entrée unique
// Pour les Server Components, utiliser auth-server.ts

import { getSession } from './auth-server'

// Exporter pour les Server Components
export { getSession, getSession as auth }

// Pour les Client Components, on ne peut pas utiliser next/headers
// Les fonctions serveur doivent être appelées depuis les Server Components
