import { getProjects } from '@/lib/projects'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import Footer from '@/components/Footer'

export const revalidate = 60

export default async function Home() {
  const projects = await getProjects()
  return (
    <>
      <Navbar />
      <Hero />
      <section id="work" className="container py-5" style={{ marginTop: '4rem' }}>
        <h2 className="display-5 fw-bold mb-5">Selected Work</h2>
        <div className="row g-4">
          {projects.map((p) => (
            <div key={p.id} className="col-12 col-md-6 col-lg-4 d-flex">
              <ProjectCard project={p} />
            </div>
          ))}
          {!projects.length && <p className="text-muted-custom">No projects yet.</p>}
        </div>
      </section>
      <Footer />
    </>
  )
}