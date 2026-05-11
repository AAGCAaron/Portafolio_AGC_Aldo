import React from 'react';
import { Container } from 'react-bootstrap';
import {
  FaReact, FaNodeJs, FaPython, FaDocker, FaDatabase, FaGitAlt, FaJs
} from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiCplusplus, SiOpengl
} from 'react-icons/si';
import './TechStack.css';

const techs = [
  { name: 'React',        icon: <FaReact />,       color: '#61DAFB' },
  { name: 'TypeScript',   icon: <SiTypescript />,  color: '#3178C6' },
  { name: 'JavaScript',   icon: <FaJs />,          color: '#F7DF1E' },
  { name: 'Node.js',      icon: <FaNodeJs />,      color: '#339933' },
  { name: 'Python',       icon: <FaPython />,      color: '#3776AB' },
  { name: 'C++',          icon: <SiCplusplus />,   color: '#00599C' },
  { name: 'PostgreSQL',   icon: <SiPostgresql />,  color: '#4169E1' },
  { name: 'MongoDB',      icon: <SiMongodb />,     color: '#47A248' },
  { name: 'Tailwind',     icon: <SiTailwindcss />, color: '#06B6D4' },
  { name: 'Docker',       icon: <FaDocker />,      color: '#2496ED' },
  { name: 'OpenGL',       icon: <SiOpengl />,      color: '#5586A4' },
  { name: 'Git',          icon: <FaGitAlt />,      color: '#F05032' },
];

// Duplicate for seamless marquee loop
const doubled = [...techs, ...techs];

const TechStack = () => {
  return (
    <section className="techstack-section" id="skills">
      <Container>
        <div className="text-center mb-5">
          <p className="techstack-eyebrow">Lo que uso a diario</p>
          <h2 className="section-title">Tech Stack</h2>
          <p className="techstack-sub">
            Herramientas con las que construyo software escalable, limpio y eficiente.
          </p>
        </div>
      </Container>

      {/* Marquee */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {doubled.map((tech, i) => (
            <div key={i} className="tech-chip">
              <span className="tech-chip-icon" style={{ color: tech.color }}>
                {tech.icon}
              </span>
              <span className="tech-chip-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <Container className="mt-5">
        <div className="tech-grid">
          {techs.map((tech, i) => (
            <div key={i} className="tech-card" style={{ '--glow-color': tech.color }}>
              <div className="tech-card-icon" style={{ color: tech.color }}>
                {tech.icon}
              </div>
              <span className="tech-card-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TechStack;
