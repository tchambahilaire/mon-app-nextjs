import { getSession } from "./auth/auth"

// Exporter auth comme alias de getSession pour la compatibilité
export const auth = getSession

// Exporter aussi les autres fonctions nécessaires
export { getSession }
