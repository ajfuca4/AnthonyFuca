import React, { useEffect, useRef } from 'react';
import { TechIcon, TECH_CATALOG } from './TechIcon';

export function TechStripe({ technologies, selectedTech, onSelectTech }) {
  const bandRef = useRef(null);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const passMs = 28000;
    let frameId = 0;
    let lastTime = 0;
    let pauseUntil = 0;
    let pointerOver = false;
    let pointerDown = false;
    let finished = false;

    const pause = (ms) => {
      pauseUntil = Math.max(pauseUntil, performance.now() + ms);
    };

    const handleWheel = (event) => {
      const maxScroll = band.scrollWidth - band.clientWidth;
      if (maxScroll <= 0) return;

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      if (delta === 0) return;

      const atStart = band.scrollLeft <= 0;
      const atEnd = band.scrollLeft >= maxScroll - 1;
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;

      event.preventDefault();
      pause(900);
      band.scrollLeft += delta;
      if (band.scrollLeft >= maxScroll - 1) finished = true;
    };

    const step = (now) => {
      frameId = requestAnimationFrame(step);
      if (
        finished ||
        motionQuery.matches ||
        pointerOver ||
        pointerDown ||
        now < pauseUntil
      ) {
        lastTime = now;
        return;
      }

      const maxScroll = band.scrollWidth - band.clientWidth;
      if (maxScroll <= 1) {
        lastTime = now;
        return;
      }

      const dt = lastTime ? Math.min(48, now - lastTime) : 16;
      lastTime = now;
      const next = band.scrollLeft + (maxScroll / passMs) * dt;
      if (next >= maxScroll) {
        band.scrollLeft = maxScroll;
        finished = true;
        return;
      }
      band.scrollLeft = next;
    };

    const handlePointerEnter = () => {
      pointerOver = true;
    };
    const handlePointerLeave = () => {
      pointerOver = false;
      pointerDown = false;
      pause(400);
    };
    const handlePointerDown = () => {
      pointerDown = true;
    };
    const handlePointerUp = () => {
      pointerDown = false;
      pause(700);
    };

    band.addEventListener('wheel', handleWheel, { passive: false });
    band.addEventListener('pointerenter', handlePointerEnter);
    band.addEventListener('pointerleave', handlePointerLeave);
    band.addEventListener('pointerdown', handlePointerDown);
    band.addEventListener('pointerup', handlePointerUp);
    band.addEventListener('pointercancel', handlePointerUp);
    frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
      band.removeEventListener('wheel', handleWheel);
      band.removeEventListener('pointerenter', handlePointerEnter);
      band.removeEventListener('pointerleave', handlePointerLeave);
      band.removeEventListener('pointerdown', handlePointerDown);
      band.removeEventListener('pointerup', handlePointerUp);
      band.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  return (
    <section className="tech-stripe-section" aria-label="Technologies and Languages">
      <div className="tech-stripe-header">
        <span className="section-eyebrow"> Tools, Technologies &amp; Languages</span>
        {selectedTech && (
          <button
            type="button"
            className="clear-filter-pill"
            onClick={() => onSelectTech(null)}
          >
            Filtering by: {TECH_CATALOG[selectedTech]?.name || selectedTech} &times;
          </button>
        )}
      </div>

      <div className="tech-stripe-band" ref={bandRef}>
        <div className="tech-marquee-track">
          {technologies.map((techKey) => {
            const isSelected = selectedTech === techKey;
            return (
              <button
                key={techKey}
                type="button"
                className={`tech-stripe-item ${isSelected ? 'tech-stripe-item--active' : ''}`}
                onClick={() =>
                  onSelectTech(selectedTech === techKey ? null : techKey)
                }
                title={`Filter projects by ${TECH_CATALOG[techKey]?.name || techKey}`}
              >
                <TechIcon techKey={techKey} size={32} showLabel={true} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
