export type ProjectImage = {
  id: string
  src: string
  caption?: string
  position: number
}

export type Project = {
  id: string
  slug: string
  title: string
  description: string
  cover: string | null
  tags: string[]
  created_at: string
  project_images?: ProjectImage[]
}