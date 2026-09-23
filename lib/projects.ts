import { createClient } from '@/lib/supabase/server'
import type { Project } from '@/lib/types'

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*, project_images(*)')
    .order('created_at', { ascending: false })
  return (data ?? []) as Project[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*, project_images(*)')
    .eq('slug', slug)
    .single()
  return (data as Project) ?? null
}