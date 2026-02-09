import React from 'react';
import './Projects.css';
import { FaStar, FaReact, FaPython, FaDatabase, FaCube } from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiOpengl } from 'react-icons/si';

const ProjectCard = ({ title, tech, difficulty, image, description }) => {
    return (
        <div className="project-card">
            <div className="project-image-container">
                <img src={image} alt={title} className="project-image" />
                <div className="project-overlay">
                    <button className="project-btn">Ver Detalles</button>
                </div>
            </div>
            <div className="project-content">
                <h3 className="project-title">{title}</h3>
                <div className="project-difficulty">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} color={i < difficulty ? "#FFD700" : "#ccc"} />
                    ))} <span className="difficulty-label">Dificultad</span>
                </div>
                <p className="project-description">{description}</p>
                <div className="project-tech">
                    {tech.map((Icon, idx) => (
                        <Icon key={idx} className="tech-icon" />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const projects = [
        {
            title: "Portal Institucional UNAM",
            tech: [FaReact, SiTailwindcss, FaDatabase],
            difficulty: 4,
            image: "https://placehold.co/600x400/1a1a2e/FFF?text=UNAM+Portal",
            description: "Sistema web para gestión administrativa y publicación de contenidos académicos."
        },
        {
            title: "Modelado 3D Tenochtitlán",
            tech: [SiOpengl, FaPython, FaCube],
            difficulty: 5,
            image: "https://placehold.co/600x400/2009C8/FFF?text=3D+Tenochtitlan",
            description: "Recreación histórica interactiva utilizando OpenGL y Python para renderizado en tiempo real."
        },
        {
            title: "Dashboard de Auditoría",
            tech: [FaDatabase, FaReact],
            difficulty: 3,
            image: "https://placehold.co/600x400/4E37F6/FFF?text=Audit+Dashboard",
            description: "Visualización de datos de auditoría de TI y control de riesgos."
        }
    ];

    return (
        <section className="projects-section">
            <h2 className="section-title">Proyectos Destacados</h2>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
