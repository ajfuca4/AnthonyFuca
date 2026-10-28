import React, { useEffect, useState } from 'react';
import { portfolioData } from './data/portfolioData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TechStripe } from './components/TechStripe';
import { ProjectGallery } from './components/ProjectGallery';
import { TECH_CATALOG } from './components/TechIcon';
import './App.css';

function getSystemTheme() {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'dark';
}

export function App() {
  const [selectedTech, setSelectedTech] = useState(null);
  // Initialize automatically from the device's system color scheme setting
  const [theme, setTheme] = useState(getSystemTheme);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Every technology defined in TechIcon appears in the scrolling stripe,
  // whether or not it is listed on a project card.
  const catalogTechnologies = Object.keys(TECH_CATALOG);

  return (
    <div className="app-shell" data-theme={theme}>
      <Header
        name={portfolioData.name}
        links={portfolioData.links}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="main-content">
        <Hero
          name={portfolioData.name}
          portrait={portfolioData.portrait}
          tagline={portfolioData.tagline}
          bio={portfolioData.bio}
          links={portfolioData.links}
        />

        <TechStripe
          technologies={catalogTechnologies}
          selectedTech={selectedTech}
          onSelectTech={setSelectedTech}
        />

        <ProjectGallery
          projects={portfolioData.projects}
          selectedTech={selectedTech}
          onSelectTech={setSelectedTech}
        />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} {portfolioData.name}. Built with React.js &amp; JavaScript.
          </p>
          <div className="footer-links">
            <a href={portfolioData.links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={portfolioData.links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={portfolioData.links.email}>Email</a>
            <a href={portfolioData.links.resume} download="Anthony Fuca Resume.pdf">
              Resume
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
