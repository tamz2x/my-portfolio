import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/SignOutButton'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  async function createProject() {
    'use server'
    const sb = await createClient()

    const { data: { user } } = await sb.auth.getUser()
    if (!user) redirect('/admin/login')

    const { data, error } = await sb
      .from('projects')
      .insert({ title: 'New Project', slug: `project-${Date.now()}` })
      .select()
      .single()

    if (error) {
      console.error('CREATE PROJECT FAILED:', error)
      throw new Error(`Create project failed: ${error.message}`)
    }

    redirect(`/admin/projects/${data.id}`)
  }

  return (
    <div className="min-vh-100 p-4">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 fw-bold mb-0">Dashboard</h1>
          <div className="d-flex gap-2">
            {/* Key change: this is a real <form>, not a bare button */}
            <form action={createProject}>
              <button type="submit" className="btn-light-custom">
                + New Project
              </button>
            </form>
            <SignOutButton />
          </div>
        </div>

        <div className="d-flex flex-column gap-2">
          {projects?.map((p) => (
            <Link
              key={p.id}
              href={`/admin/projects/${p.id}`}
              className="card-dark p-3 text-decoration-none text-white d-flex justify-content-between align-items-center"
            >
              <div>
                <p className="fw-medium mb-0">{p.title}</p>
                <p className="text-muted-custom small mb-0">{p.slug}</p>
              </div>
              <span className="text-muted-custom small">
                Edit <i className="bi bi-arrow-right"></i>
              </span>
            </Link>
          ))}
          {!projects?.length && <p className="text-muted-custom">No projects yet.</p>}
        </div>
      </div>
    </div>
  )
}