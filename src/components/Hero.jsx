import React from 'react';
import './Hero.css';
import { FaDownload } from 'react-icons/fa';
import ParticlesBackground from './ParticlesBackground';

const Hero = () => {
  return (
    <section className="hero-section">
      <ParticlesBackground />
      <div className="hero-content">
        <div className="hero-photo-container">
          {/* Placeholder for photo */}
          <div className="hero-photo-placeholder">
            <span className="photo-text"><div className=""></div></span>
          </div>
          {/* If you have a real image, use: <img src={yourImage} alt="Aldo Gutierrez" className="hero-photo" /> */}
        </div>
        <h1 className="hero-name">Aldo Gutierrez</h1>
        <h2 className="hero-title">
          Estudiante de <br />
          <span className="hero-subtitle">Ingeniería en Computación</span>
        </h2>
        <p className="hero-description">
          Transformando datos complejos en experiencias web interactivas y soluciones precisas. Aportando visión joven e innovadora.
        </p>
        <button className="hero-button">
          Descargar CV <FaDownload style={{ marginLeft: '10px' }} />
        </button>
      </div>
      <div className="hero-background-glow"></div>
    </section>
  );
};

export default Hero;
