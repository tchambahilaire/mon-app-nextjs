import { getSession } from "@/lib/auth/auth-server"
import { getResource } from "@/actions/resources"
import { redirect, notFound } from "next/navigation"
import ResourceForm from "@/components/ResourceForm"

interface PageProps {
  params: { id: string }
}

export default async function EditResourcePage({ params }: PageProps) {
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
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">
            ✏️ Modifier la ressource
          </h1>
          <ResourceForm initialData={resource} />
        </div>
      </div>
    </div>
  )
}
