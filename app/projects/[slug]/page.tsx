import { getProjectBySlug } from '@/lib/projects'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

export const revalidate = 60

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const images = (project.project_images ?? [])
    .slice()
    .sort((a, b) => a.position - b.position)

  return (
    <>
      <Navbar />
      <main className="container py-5" style={{ paddingTop: '7rem' }}>
        <h1 className="display-4 fw-bold">{project.title}</h1>
        <p className="text-muted-custom fs-5 mt-3">{project.description}</p>
        <div className="d-flex flex-column gap-4 mt-5">
          {images.map((img) => (
            <div
              key={img.id}
              className="position-relative rounded-4 overflow-hidden card-dark"
              style={{ aspectRatio: '16/9' }}
            >
              <Image
                src={img.src}
                alt={img.caption || ''}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  )
}