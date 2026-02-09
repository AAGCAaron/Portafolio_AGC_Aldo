import React from 'react';
import './Experience.css';
import { FaBriefcase, FaGraduationCap, FaUserTie } from 'react-icons/fa';

const Experience = () => {
    const experiences = [
        {
            title: "Servicio Social - Desarrollo Web",
            company: "Consejos Académicos CAAHyA",
            period: "2025 - 2026",
            duration: "6 meses",
            description: [
                "Migración del sitio institucional CAAHyA a tecnologías modernas (JS/Bootstrap), reduciendo la carga del servidor.",
                "Configuración desde cero de un entorno de servidor robusto utilizando Docker, NGINX y Gitea.",
                "Implementación de arquitectura de contenedores para gestionar el Proxy Inverso y el flujo de versiones del código."
            ],
            icon: <FaBriefcase />,
            active: true // Highlight the most recent one
        },
        {
            title: "Documentación y Requerimientos",
            company: "Liverpool (Colaboración PROMASS)",
            period: "2023",
            duration: "2 meses",
            description: [
                "Apoyo en la documentación de un sistema desarrollado en colaboración con PROMASS.",
                "Participación en levantamiento de requerimientos junto a un analista funcional.",
                "Seguimiento de cambios en código y pruebas básicas de funcionalidad."
            ],
            icon: <FaUserTie />
        },
        {
            title: "Servicio al Cliente",
            company: "Promass (Liverpool)",
            period: "2022 - 2023",
            duration: "6 meses",
            description: [
                "Atención al cliente de manera formal del Programa de Integración Familiar.",
                "Manejo de situaciones complejas con trato profesional.",
                "Resolución de problemas y gestión de emociones del cliente."
            ],
            icon: <FaUserTie />
        }
    ];

    return (
        <section className="experience-section">
            <h2 className="section-title">Trayectoria Profesional</h2>
            <div className="timeline">
                {experiences.map((exp, index) => (
                    <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                        <div className="timeline-icon">
                            {exp.icon}
                        </div>
                        <div className={`timeline-content ${exp.active ? 'active-card' : ''}`}>
                            <span className="timeline-date">{exp.period}</span>
                            <h3 className="timeline-title">{exp.title}</h3>
                            <h4 className="timeline-company">{exp.company} <span className="timeline-duration">({exp.duration})</span></h4>
                            <ul className="timeline-description">
                                {exp.description.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
