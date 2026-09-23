import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/types'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="text-decoration-none text-white">
      <div className="project-card">
        <div className="position-relative overflow-hidden rounded-4 card-dark" style={{ aspectRatio: '4/3' }}>
          {project.cover && (
            <Image src={project.cover} alt={project.title} fill
              sizes="(max-width:768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
          )}
        </div>
        <h3 className="h5 fw-semibold mt-3 mb-1">{project.title}</h3>
        <p className="text-muted-custom small mb-0">{project.tags?.join(' · ')}</p>
      </div>
    </Link>
  )
}