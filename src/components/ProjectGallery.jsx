import React from 'react';
import { ProjectCard } from './ProjectCard';
import { TECH_CATALOG } from './TechIcon';

export function ProjectGallery({ projects, selectedTech, onSelectTech }) {
  const filteredProjects = selectedTech
    ? projects.filter((project) => project.technologies.includes(selectedTech))
    : projects;

  return (
    <section id="projects" className="projects-section">
      <div className="projects-header">
        <div>
          <span className="section-eyebrow">Featured Work</span>
          <h2 className="section-title">Project Gallery</h2>
        </div>
      </div>

      {selectedTech && (
        <div className="active-filter-banner">
          <span>
            Showing <strong>{filteredProjects.length}</strong> project
            {filteredProjects.length === 1 ? '' : 's'} built with{' '}
            <strong>{TECH_CATALOG[selectedTech]?.name || selectedTech}</strong>
          </span>
          <button
            type="button"
            className="reset-filter-btn"
            onClick={() => onSelectTech(null)}
          >
            Show All Projects
          </button>
        </div>
      )}

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            selectedTech={selectedTech}
            onTechClick={onSelectTech}
          />
        ))}
      </div>
    </section>
  );
}
