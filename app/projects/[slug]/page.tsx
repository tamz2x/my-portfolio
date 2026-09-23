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
        <div className="d-flex flex-column gap-4">
          {images.map((img, index) => (
            <div 
              key={img.id} 
              className="position-relative" 
              style={{ 
                width: '100%', 
                backgroundColor: '#0f0f0f',
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <Image
                src={img.src}
                alt={img.caption || ''}
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
      </main>
    </>
  )
}