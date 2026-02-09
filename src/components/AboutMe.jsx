import React from 'react';
import './AboutMe.css';
import { FaCode, FaDatabase, FaClipboardCheck, FaCube, FaDesktop, FaNetworkWired, FaLanguage, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';

const AboutMe = () => {
    return (
        <section className="about-section">
            <h2 className="section-title">Sobre Mí & Habilidades</h2>
            <div className="bento-grid">
                <div className="bento-tile tile-1">
                    <FaCode className="tile-icon" />
                    <h3>Skills</h3>
                    <p>React, JS, Tailwind</p>
                </div>
                <div className="bento-tile tile-2">
                    <FaDatabase className="tile-icon" />
                    <h3>Data</h3>
                    <p>SQL Server, Power BI</p>
                </div>
                <div className="bento-tile tile-3">
                    <FaClipboardCheck className="tile-icon" />
                    <h3>Auditoría</h3>
                    <p>Controles y Riesgos TI</p>
                </div>
                <div className="bento-tile tile-4">
                    <FaCube className="tile-icon" />
                    <h3>3D Modeling</h3>
                    <p>OpenGL Projects</p>
                </div>
                <div className="bento-tile tile-center">
                    <div className="profile-content">
                        <FaUserTie className="profile-icon" />
                        <h3>Perfil Profesional</h3>
                        <p>Desarrollador apasionado por la interactividad y la precisión de los datos. Experto en React, análisis con SQL y procesos de auditoría de TI.</p>
                    </div>
                </div>
                <div className="bento-tile tile-6">
                    <FaDesktop className="tile-icon" />
                    <h3>Sistemas</h3>
                    <p>Windows & Linux</p>
                </div>
                <div className="bento-tile tile-7">
                    <FaNetworkWired className="tile-icon" />
                    <h3>Redes</h3>
                    <p>OSI, LAN, WAN</p>
                </div>
                <div className="bento-tile tile-8">
                    <FaLanguage className="tile-icon" />
                    <h3>Idiomas</h3>
                    <p>Inglés Avanzado</p>
                </div>
                <div className="bento-tile tile-9">
                    <FaMapMarkerAlt className="tile-icon" />
                    <h3>Ubicación</h3>
                    <p>Ciudad de México</p>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
