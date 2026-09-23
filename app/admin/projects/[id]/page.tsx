import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import EditProjectClient from './EditProjectClient'

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Server-side auth check — cannot be bypassed
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  // Authorize: does this project exist?
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (!project) notFound()

  return <EditProjectClient projectId={id} initialProject={project} />
}