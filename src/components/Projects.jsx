import React, { useState, useRef, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTimes, FaExternalLinkAlt, FaGithub, FaLayerGroup, FaBolt, FaUserShield } from 'react-icons/fa';
import { FaReact, FaPython, FaDatabase, FaCube } from 'react-icons/fa';
import { SiTailwindcss, SiOpengl } from 'react-icons/si';
import './Projects.css';

/* ─── Tilt Card with spotlight border ─── */
const TiltCard = ({ project, onClick }) => {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [spotlight, setSpotlight] = useState({ x: 50, y: 50, visible: false });

    const handleMouseMove = useCallback((e) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const mx = e.clientX - cx;
        const my = e.clientY - cy;
        const maxTilt = 10;
        setTilt({
            x: (my / (rect.height / 2)) * maxTilt,
            y: -(mx / (rect.width / 2)) * maxTilt,
        });
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        setSpotlight({ x: px, y: py, visible: true });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setTilt({ x: 0, y: 0 });
        setSpotlight(s => ({ ...s, visible: false }));
    }, []);

    const cardStyle = {
        transform: tilt.x !== 0 || tilt.y !== 0
            ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
            : `perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: tilt.x === 0 && tilt.y === 0
            ? 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.08s linear',
    };

    const spotlightStyle = {
        background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(59,130,246,0.22) 0%, transparent 55%)`,
        opacity: spotlight.visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
    };

    return (
        <div
            ref={cardRef}
            className="project-card"
            style={cardStyle}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(project)}
        >
            {/* Dynamic border spotlight */}
            <div className="card-spotlight" style={spotlightStyle} />

            {/* Image */}
            <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-overlay">
                    <div className="overlay-content">
                        <span className="overlay-tag">{project.subtitle}</span>
                        <button className="card-cta-btn">Ver Proyecto →</button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="project-content">
                <div className="card-header-area">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="card-role-badge">{project.role}</span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="card-footer-area">
                    <div className="card-tech-row">
                        {project.techIcons.slice(0, 3).map((Icon, idx) => (
                            <span key={idx} className="tech-icon-wrapper">
                                <Icon className="tech-icon-small" />
                            </span>
                        ))}
                    </div>
                    <span className="card-key-feature">⚡ {project.keyFeature}</span>
                </div>
            </div>
        </div>
    );
};

/* ─── Premium Modal ─── */
const ProjectModal = ({ project, show, onClose }) => {
    const [animated, setAnimated] = useState(false);

    React.useEffect(() => {
        if (show) {
            const t = setTimeout(() => setAnimated(true), 50);
            return () => clearTimeout(t);
        } else {
            setAnimated(false);
        }
    }, [show]);

    if (!project) return null;

    return (
        <div className={`modal-overlay-custom ${show ? 'modal-overlay-visible' : ''}`} onClick={onClose}>
            <div className="modal-premium-shell" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar"><FaTimes /></button>
                <Row className="g-0" style={{ minHeight: '520px' }}>
                    <Col lg={6} className="modal-image-panel">
                        <div className={`modal-img-wrapper ${animated ? 'anim-in' : ''}`}>
                            <img src={project.image} alt={project.title} className="modal-hero-img" />
                            <div className="modal-img-glow" />
                        </div>
                    </Col>
                    <Col lg={6} className="modal-info-panel">
                        <div className={`modal-info-inner ${animated ? 'anim-in' : ''}`}>
                            <div className="modal-header-area">
                                <span className="modal-eyebrow">Proyecto Destacado</span>
                                <h2 className="modal-project-title">{project.title}</h2>
                                <p className="modal-project-subtitle">{project.subtitle}</p>
                            </div>
                            <div className="modal-ficha">
                                <div className="ficha-item">
                                    <div className="ficha-icon"><FaLayerGroup /></div>
                                    <div>
                                        <div className="ficha-label">Arquitectura</div>
                                        <div className="ficha-value">{project.tech.join(' · ')}</div>
                                    </div>
                                </div>
                                <div className="ficha-item">
                                    <div className="ficha-icon"><FaBolt /></div>
                                    <div>
                                        <div className="ficha-label">Funcionalidad Clave</div>
                                        <div className="ficha-value">{project.keyFeature}</div>
                                    </div>
                                </div>
                                <div className="ficha-item">
                                    <div className="ficha-icon"><FaUserShield /></div>
                                    <div>
                                        <div className="ficha-label">Mi Rol</div>
                                        <div className="ficha-value">{project.role}</div>
                                    </div>
                                </div>
                            </div>
                            <p className="modal-full-desc">{project.fullDescription}</p>
                            <div className="modal-tech-badges">
                                {project.tech.map((t, i) => <span key={i} className="modal-badge">{t}</span>)}
                            </div>
                            <div className="modal-cta-row">
                                <a href="#" className="btn-modal-primary"><FaExternalLinkAlt size={13} /> Live Demo</a>
                                <a href="#" className="btn-modal-github"><FaGithub size={18} /> Ver Código</a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

/* ─── Main Component ─── */
const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setTimeout(() => setSelectedProject(null), 400);
    };

    const handleShow = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const projects = [
        {
            title: "Portal Institucional UNAM",
            tech: ["React", "Tailwind", "PostgreSQL"],
            techIcons: [FaReact, SiTailwindcss, FaDatabase],
            image: "https://placehold.co/900x600/1e293b/FFF?text=UNAM+Portal",
            description: "Plataforma web para gestión administrativa y publicación de contenidos académicos para +50 facultades.",
            subtitle: "Plataforma de Gestión Educativa",
            fullDescription: "Desarrollo de una plataforma integral para la gestión de recursos académicos con autenticación centralizada, control de roles granular e interfaz accesible para miles de usuarios simultáneos.",
            keyFeature: "Auth multifactor & roles granulares",
            role: "Full Stack Developer",
        },
        {
            title: "Modelado 3D Tenochtitlán",
            tech: ["OpenGL", "Python", "C++"],
            techIcons: [SiOpengl, FaPython, FaCube],
            image: "https://placehold.co/900x600/0a0b1e/FFF?text=3D+Tenochtitlan",
            description: "Recreación histórica interactiva con renderizado en tiempo real usando OpenGL y Python.",
            subtitle: "Visualización Histórica Interactiva",
            fullDescription: "Proyecto que recrea la arquitectura mexica con alta fidelidad. Implementa iluminación global, texturizado procedimental y cámara libre de navegación.",
            keyFeature: "Iluminación global en tiempo real",
            role: "Graphics & Systems Engineer",
        },
        {
            title: "Dashboard de Auditoría",
            tech: ["React", "D3.js", "SQL"],
            techIcons: [FaReact, FaDatabase],
            image: "https://placehold.co/900x600/1a3a6b/FFF?text=Audit+Dashboard",
            description: "Visualización de datos de auditoría de TI con motor de reglas y reportes automatizados.",
            subtitle: "Analítica de Riesgos y Cumplimiento",
            fullDescription: "Herramienta de análisis para auditores que detecta anomalías en tiempo real y genera reportes automatizados en PDF. Integra un motor de reglas configurable sin código.",
            keyFeature: "Motor de reglas sin código",
            role: "Frontend Engineer & Data Viz",
        },
        {
            title: "Seguridad Criptográfica",
            tech: ["Python", "AES-256", "SQLite"],
            techIcons: [FaPython, FaDatabase],
            image: "https://placehold.co/900x600/1e1b4b/FFF?text=Crypto+Security",
            description: "Cifrado AES-256-GCM para protección de archivos y comunicaciones seguras end-to-end.",
            subtitle: "Protección de Datos End-to-End",
            fullDescription: "Aplicación de seguridad que garantiza integridad y confidencialidad de archivos locales. Implementa AES-256-GCM con gestión segura de claves y registro de auditoría inmutable.",
            keyFeature: "AES-256-GCM + auditoría inmutable",
            role: "Security & Backend Engineer",
        }
    ];

    return (
        <section className="projects-section py-5">
            <Container>
                <h2 className="section-title mb-5">Proyectos Destacados</h2>
                <Row className="g-4 justify-content-center">
                    {projects.map((project, index) => (
                        <Col lg={6} md={10} key={index}>
                            <TiltCard project={project} onClick={handleShow} />
                        </Col>
                    ))}
                </Row>
            </Container>

            <ProjectModal
                project={selectedProject}
                show={showModal}
                onClose={handleClose}
            />
        </section>
    );
};

export default Projects;
