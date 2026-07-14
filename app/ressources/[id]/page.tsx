import { getSession } from "@/lib/auth/auth-server"
import { getResource } from "@/actions/resources"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { Calendar, ArrowLeft, Edit } from "lucide-react"

interface PageProps {
  params: { id: string }
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
  }

  let resource
  try {
    resource = await getResource(params.id)
  } catch {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour au dashboard
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-slate-800">
              {resource.title}
            </h1>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              resource.published 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-amber-100 text-amber-700'
            }`}>
              {resource.published ? '📢 Publié' : '✏️ Brouillon'}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(resource.createdAt).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </span>
            <span>•</span>
            <span>Modifié le {new Date(resource.updatedAt).toLocaleDateString('fr-FR')}</span>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
              {resource.content}
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <Link
              href={`/ressources/${resource.id}/edit`}
              className="inline-flex items-center gap-2 btn-gradient text-white px-6 py-2.5 rounded-xl font-medium shadow-lg"
            >
              <Edit className="w-4 h-4" />
              Modifier cette ressource
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
