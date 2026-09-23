"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

export default function ProjectCard({ 
  project, 
  preload = false 
}: { 
  project: Project
  preload?: boolean 
}) {
  const hasCover = project.cover && project.cover.trim() !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-100 h-100"
      style={{ display: 'flex' }}
    >
      <Link 
        href={`/projects/${project.slug}`} 
        className="text-decoration-none w-100 d-flex"
      >
        <div 
          className="card bg-dark border-0 w-100 overflow-hidden project-card d-flex flex-column"
          style={{
            borderRadius: '16px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          {/* Square image container */}
          <div 
            className="position-relative overflow-hidden flex-shrink-0"
            style={{ 
              width: '100%',
              aspectRatio: '1 / 1',
              backgroundColor: '#111',
              position: 'relative',
            }}
          >
            {hasCover ? (
              <Image
                src={project.cover!}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
                preload={preload}
                loading={preload ? "eager" : "lazy"}
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
            ) : (
              <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <span className="text-secondary small">No Image</span>
              </div>
            )}
          </div>
          
          <div className="card-body p-4 d-flex flex-column flex-grow-1">
            <h5 className="card-title fw-bold text-white mb-3">{project.title}</h5>
            
            <div className="d-flex flex-wrap gap-2 mt-auto">
              {project.tags?.map((tag) => (
                <span 
                  key={tag} 
                  className="badge bg-secondary bg-opacity-25 text-secondary rounded-pill px-3 py-2 fw-normal"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}