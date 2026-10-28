import React, { useEffect, useRef, useState } from 'react';
import { TechIcon, TECH_CATALOG } from './TechIcon';

/**
 * Horizontal Project Card matching the reference diagram:
 * - Left column: Project Name, short description, horizontally scrollable Stack tags, and Learn More button
 * - Right column: Slanted + rounded image cutout (angled left edge, rounded outer right corners)
 */
export function ProjectCard({ project, onTechClick, selectedTech }) {
  const {
    title,
    description,
    image,
    technologies,
    URL,
  } = project;

  const techLogosRef = useRef(null);
  const currentScrollRef = useRef(0);
  const userPauseFramesRef = useRef(0);
  const directionRef = useRef(1);
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Allow vertical or horizontal wheel/trackpad scrolling on the stack row
  useEffect(() => {
    const container = techLogosRef.current;
    if (!container) return;

    const handleWheel = (event) => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      if (delta === 0) return;

      event.preventDefault();
      userPauseFramesRef.current = 75; // Pause auto-scroll briefly while user manually scrolls

      const nextScroll = Math.max(
        0,
        Math.min(maxScroll, container.scrollLeft + delta)
      );
      container.scrollLeft = nextScroll;
      currentScrollRef.current = nextScroll;
    };

    const handleNativeScroll = () => {
      if (userPauseFramesRef.current > 0) {
        currentScrollRef.current = container.scrollLeft;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleNativeScroll, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleNativeScroll);
    };
  }, []);

  useEffect(() => {
    const container = techLogosRef.current;
    if (!container || !isCardHovered) return;

    let animationFrameId;
    const speed = 0.75; // pixels per frame

    currentScrollRef.current = container.scrollLeft;

    const step = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (maxScroll > 0) {
        if (userPauseFramesRef.current > 0) {
          userPauseFramesRef.current -= 1;
          currentScrollRef.current = container.scrollLeft;
        } else {
          currentScrollRef.current += speed * directionRef.current;

          if (currentScrollRef.current >= maxScroll) {
            currentScrollRef.current = maxScroll;
            directionRef.current = -1;
            userPauseFramesRef.current = 35; // brief pause at the right end
          } else if (currentScrollRef.current <= 0) {
            currentScrollRef.current = 0;
            directionRef.current = 1;
            userPauseFramesRef.current = 35; // brief pause at the left end
          }

          container.scrollLeft = currentScrollRef.current;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isCardHovered]);

  const handleMouseLeave = () => {
    setIsCardHovered(false);
    userPauseFramesRef.current = 0;
    directionRef.current = 1;
    currentScrollRef.current = 0;
    if (techLogosRef.current) {
      techLogosRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <article
      className="project-card"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left side: Project details, scrollable tech stack, and Learn More button */}
      <div className="project-card-content">
        <div className="project-body">
          <h3 className="project-title">{title}</h3>
          <p className="project-description">{description}</p>
        </div>

        <div className="project-tech-row" aria-label={`Technologies used in ${title}`}>
          <span className="project-tech-label">Stack:</span>
          <div ref={techLogosRef} className="project-tech-logos">
            {technologies.map((techKey) => {
              const techName = TECH_CATALOG[techKey]?.name || techKey;
              const isHighlighted = selectedTech === techKey;
              return (
                <button
                  key={techKey}
                  type="button"
                  className={`project-tech-pill ${
                    isHighlighted ? 'project-tech-pill--active' : ''
                  }`}
                  onClick={() =>
                    onTechClick &&
                    onTechClick(selectedTech === techKey ? null : techKey)
                  }
                  title={techName}
                >
                  <TechIcon techKey={techKey} size={20} showLabel={true} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="project-card-footer">
          <a
            href={URL}
            target="_blank"
            rel="noopener noreferrer"
            className="project-cta-button"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Right side: Slanted left edge + rounded corners image showcase matching reference diagram */}
      <div className="project-image-frame">
        <svg className="project-image-shape-svg" aria-hidden="true">
          <defs>
            <clipPath id="card-image-horizontal-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0.12,0 Q 0,0 0.02,0.11 L 0.2,0.9 Q 0.22,1 0.34,1 L 0.86,1 Q 1,1 1,0.86 L 1,0.14 Q 1,0 0.86,0 Z" />
            </clipPath>
          </defs>
        </svg>
        <div className="project-image-clipped">
          <img
            src={image}
            alt={`${title} preview`}
            className="project-image"
            loading="lazy"
          />
          <svg
            className="project-image-border-svg"
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 0.12,0 Q 0,0 0.02,0.11 L 0.2,0.9 Q 0.22,1 0.34,1 L 0.86,1 Q 1,1 1,0.86 L 1,0.14 Q 1,0 0.86,0 Z"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </article>
  );
}
