import Link from "next/link"
import { auth } from "@/lib/auth"
import { Button } from "./ui/button"
import { logout } from "@/actions/auth"

export default async function Navbar() {
  const user = await auth()

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          MonApp
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">
                {user.name || user.email}
              </span>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
              <form action={logout}>
                <Button variant="destructive" size="sm">Déconnexion</Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">Connexion</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Inscription</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
