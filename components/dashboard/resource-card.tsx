import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DeleteButton } from "../DeleteButton"
import { Calendar, Eye } from "lucide-react"

interface ResourceCardProps {
  id: string
  title: string
  content: string
  published: boolean
  createdAt: Date
}

export function ResourceCard({ id, title, content, published, createdAt }: ResourceCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded ${
            published 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {published ? 'Publié' : 'Brouillon'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">{content}</p>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{new Date(createdAt).toLocaleDateString('fr-FR')}</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link href={`/ressources/${id}`}>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            Voir
          </Button>
        </Link>
        <Link href={`/ressources/${id}/edit`}>
          <Button variant="outline" size="sm">Modifier</Button>
        </Link>
        <DeleteButton id={id} />
      </CardFooter>
    </Card>
  )
}
