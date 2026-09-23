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
        <div className="mb-5">
          <h1 className="display-4 fw-bold text-white mb-3">{project.title}</h1>
          <p className="text-secondary fs-5">{project.description}</p>
        </div>

        <div className="d-flex flex-column gap-4">
          {images.map((img, index) => (
            <div
              key={img.id}
              className="position-relative overflow-hidden"
              style={{
                width: '100%',
                backgroundColor: '#0f0f0f',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(255, 255, 255, 0.05)',  // subtle border
              }}
            >
              <Image
                src={img.src}
                alt={img.caption || project.title}
                width={1600}
                height={1000}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
                preload={index === 0}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
              {img.caption && (
                <p className="text-secondary small mt-3 mb-0 text-center">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-5">
          <a href="/#work" className="text-secondary text-decoration-none">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Work
          </a>
        </div>
      </main>
    </>
  )
}