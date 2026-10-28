import React, { useLayoutEffect, useRef, useState } from 'react';

const STACKED_PORTRAIT_QUERY = '(max-width: 768px)';

export function Hero({ name, portrait, bio, links }) {
  const introRef = useRef(null);
  const portraitRef = useRef(null);
  const [portraitReady, setPortraitReady] = useState(false);

  useLayoutEffect(() => {
    const intro = introRef.current;
    const frame = portraitRef.current;
    if (!intro || !frame) return;

    const query = window.matchMedia(STACKED_PORTRAIT_QUERY);

    const clearFrameSize = () => {
      frame.style.width = '';
      frame.style.height = '';
      frame.style.flexBasis = '';
    };

    const update = () => {
      if (query.matches) {
        clearFrameSize();
        return;
      }

      const nameEl = intro.querySelector('.hero-name');
      const actionsEl = intro.querySelector('.hero-actions');
      if (!nameEl || !actionsEl) return;

      const styles = getComputedStyle(intro);
      const gap = parseFloat(styles.columnGap) || parseFloat(styles.gap) || 0;
      const minCopyWidth = 240;
      const textHeight = actionsEl.getBoundingClientRect().bottom - nameEl.getBoundingClientRect().top;
      const maxSide = Math.max(112, intro.clientWidth - gap - minCopyWidth);
      const next = Math.round(Math.min(textHeight, maxSide));
      const current = Math.round(frame.getBoundingClientRect().height);
      if (Math.abs(current - next) < 2) return;
      const size = `${next}px`;
      frame.style.width = size;
      frame.style.height = size;
      frame.style.flexBasis = size;
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(intro);
    intro.querySelectorAll('.hero-name, .hero-bio').forEach((el) => observer.observe(el));
    query.addEventListener('change', update);
    return () => {
      observer.disconnect();
      query.removeEventListener('change', update);
    };
  }, [bio, name, portrait]);

  return (
    <section id="top" className="hero-section">
      <div className="hero-container">
        <div className="hero-intro" ref={introRef}>
          <h1 className="hero-name">{name}</h1>
          <div className="hero-bio">
            <div className="hero-bio-content">
              {bio.map((paragraph, idx) => (
                <p key={idx} className="hero-bio-text">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              Explore Projects
            </a>
            <a href={links.email} className="btn-secondary">
              Get In Touch
            </a>
          </div>
          {portrait && (
            <div className="hero-portrait" ref={portraitRef}>
              <img
                src={portrait}
                alt={`Portrait of ${name}`}
                onLoad={() => setPortraitReady(true)}
                onError={() => setPortraitReady(false)}
                style={{ visibility: portraitReady ? 'visible' : 'hidden' }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
