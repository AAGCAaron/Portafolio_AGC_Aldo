import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaDownload, FaLinkedin, FaGithub, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Brand / Logo */}
                <div className="navbar-brand" onClick={() => scrollToSection('inicio')}>
                    <div className="brand-logo">AG</div>
                    <span className="brand-name">Aldo Gutierrez</span>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-menu">
                    <button onClick={() => scrollToSection('inicio')} className="nav-pill">Inicio</button>
                    <button onClick={() => scrollToSection('proyectos')} className="nav-pill">Proyectos</button>
                    <button onClick={() => scrollToSection('experiencia')} className="nav-pill">Trayectoria</button>
                    <button onClick={() => scrollToSection('sobre-mi')} className="nav-pill">Sobre mí</button>
                </div>

                {/* Socials & CV */}
                <div className="navbar-actions">
                    <a href="#" className="action-circle" title="LinkedIn"><FaLinkedin /></a>
                    <a href="#" className="action-circle" title="GitHub"><FaGithub /></a>
                    <button className="cv-pill">
                        <span>CV</span> <FaDownload size={12} />
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="mobile-menu">
                    <button onClick={() => scrollToSection('inicio')}>Inicio</button>
                    <button onClick={() => scrollToSection('proyectos')}>Proyectos</button>
                    <button onClick={() => scrollToSection('experiencia')}>Trayectoria</button>
                    <button onClick={() => scrollToSection('sobre-mi')}>Sobre mí</button>
                    <button className="mobile-cv">Descargar CV</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
