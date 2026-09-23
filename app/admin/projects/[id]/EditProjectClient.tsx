'use client'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import type { Project, ProjectImage } from '@/lib/types'

export default function EditProjectClient({
  projectId,
  initialProject,
}: {
  projectId: string
  initialProject: Project
}) {
  const supabase = createClient()
  const [project, setProject] = useState<Project>(initialProject)
  const [images, setImages] = useState<ProjectImage[]>([])
  const [uploading, setUploading] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  useEffect(() => { loadImages() }, [])

  async function loadImages() {
    const { data } = await supabase
      .from('project_images')
      .select('*')
      .eq('project_id', projectId)
      .order('position')
    setImages((data as ProjectImage[]) || [])
  }

  async function updateField(field: keyof Project, value: any) {
    setProject({ ...project, [field]: value })
    await supabase.from('projects').update({ [field]: value }).eq('id', projectId)
  }

  async function handleUpload(files: FileList) {
    setUploading(true)
    for (const file of Array.from(files)) {
      const path = `${project.slug}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
      const { error } = await supabase.storage.from('portfolio').upload(path, file)
      if (error) { console.error(error); continue }
      const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(path)
      const { data: inserted } = await supabase.from('project_images').insert({
        project_id: projectId,
        src: publicUrl,
        position: images.length,
      }).select().single()
      if (inserted) setImages((prev) => [...prev, inserted as ProjectImage])
    }
    setUploading(false)
  }

  async function removeImage(img: ProjectImage) {
    const marker = '/portfolio/'
    const idx = img.src.indexOf(marker)
    if (idx !== -1) {
      await supabase.storage.from('portfolio').remove([img.src.slice(idx + marker.length)])
    }
    await supabase.from('project_images').delete().eq('id', img.id)
    setImages((prev) => prev.filter((i) => i.id !== img.id))
  }

  async function setCover(url: string) {
    await updateField('cover', url)
  }

  async function deleteProject() {
    if (!confirm('Delete project and all its images?')) return
    await supabase.from('projects').delete().eq('id', projectId)
    window.location.href = '/admin/dashboard'
  }

  return (
    <div className="min-vh-100 p-4">
      <div className="container py-4" style={{ maxWidth: 900 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 fw-bold mb-0">Edit Project</h1>
          <button onClick={deleteProject} className="btn btn-outline-danger btn-sm">Delete</button>
        </div>

        <div className="card-dark p-4 mb-4 d-flex flex-column gap-3">
          <input className="form-control bg-dark text-white border-secondary"
            value={project.title} onChange={(e) => updateField('title', e.target.value)} placeholder="Title" />
          <input className="form-control bg-dark text-white border-secondary"
            value={project.slug} onChange={(e) => updateField('slug', e.target.value)} placeholder="Slug" />
          <textarea className="form-control bg-dark text-white border-secondary" rows={4}
            value={project.description || ''} onChange={(e) => updateField('description', e.target.value)}
            placeholder="Description" />
          <input className="form-control bg-dark text-white border-secondary"
            value={project.tags?.join(', ') || ''}
            onChange={(e) => updateField('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
            placeholder="Tags (comma separated)" />
          <input className="form-control bg-dark text-white border-secondary"
            value={project.cover || ''} onChange={(e) => updateField('cover', e.target.value)}
            placeholder="Cover URL" />
        </div>

        <div className="card-dark p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 mb-0">Images</h2>
            <button className="btn-light-custom" onClick={() => fileInput.current?.click()} disabled={uploading}>
              {uploading ? 'Uploading…' : '+ Upload'}
            </button>
            <input ref={fileInput} type="file" multiple accept="image/*" hidden
              onChange={(e) => e.target.files && handleUpload(e.target.files)} />
          </div>

          <div className="row g-3">
            {images.map((img) => (
              <div key={img.id} className="col-6 col-md-4">
                <div className="position-relative rounded-3 overflow-hidden card-dark" style={{ aspectRatio: '1' }}>
                  <Image src={img.src} alt="" fill sizes="(max-width:768px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                  <div className="position-absolute top-0 end-0 p-2 d-flex gap-1">
                    <button className="btn btn-sm btn-light" onClick={() => setCover(img.src)}><i className="bi bi-star"></i></button>
                    <button className="btn btn-sm btn-danger" onClick={() => removeImage(img)}><i className="bi bi-trash"></i></button>
                  </div>
                  {project.cover === img.src && (
                    <span className="position-absolute bottom-0 start-0 m-2 badge bg-primary">Cover</span>
                  )}
                </div>
              </div>
            ))}
            {!images.length && <p className="text-muted-custom small mb-0">No images yet.</p>}
          </div>
        </div>

        <a href="/admin/dashboard" className="d-inline-block mt-4 text-muted-custom text-decoration-none">
          <i className="bi bi-arrow-left"></i> Back to dashboard
        </a>
      </div>
    </div>
  )
}