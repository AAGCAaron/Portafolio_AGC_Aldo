import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { FaDownload, FaLinkedin, FaGithub, FaBars, FaTimes } from 'react-icons/fa';

const NAV_LINKS = [
    { id: 'inicio',     label: 'Inicio'      },
    { id: 'skills',     label: 'Skills'      },
    { id: 'proyectos',  label: 'Proyectos'   },
    { id: 'github',     label: 'GitHub'      },
    { id: 'experiencia',label: 'Trayectoria' },
];

const Navbar = () => {
    const [scrolled, setScrolled]       = useState(false);
    const [menuOpen, setMenuOpen]       = useState(false);
    const [activeId, setActiveId]       = useState('inicio');
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const navRef   = useRef(null);
    const pillsRef = useRef({});

    /* ── Scroll: opacity + active section detection ── */
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);

            // Find which section is currently in view
            let current = 'inicio';
            NAV_LINKS.forEach(({ id }) => {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    current = id;
                }
            });
            setActiveId(current);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Move indicator under active link ── */
    useEffect(() => {
        const activeEl = pillsRef.current[activeId];
        const navEl    = navRef.current;
        if (!activeEl || !navEl) return;

        const navRect  = navEl.getBoundingClientRect();
        const elRect   = activeEl.getBoundingClientRect();

        setIndicatorStyle({
            left:  elRect.left - navRect.left,
            width: elRect.width,
        });
    }, [activeId]);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <>
            <nav className={`floating-navbar ${scrolled ? 'nav-solid' : ''}`}>
                <div className="fn-inner">

                    {/* Logo */}
                    <button className="fn-logo" onClick={() => scrollTo('inicio')}>
                        <span className="logo-text">Aldo Gutierrez</span>
                    </button>

                    {/* Desktop links + sliding indicator */}
                    <div className="fn-links" ref={navRef}>
                        {/* Sliding active indicator */}
                        <span className="nav-indicator" style={indicatorStyle} />

                        {NAV_LINKS.map(({ id, label }) => (
                            <button
                                key={id}
                                ref={el => pillsRef.current[id] = el}
                                className={`fn-link ${activeId === id ? 'fn-link-active' : ''}`}
                                onClick={() => scrollTo(id)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="fn-actions">
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="fn-icon-btn" title="LinkedIn">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/AAGCAaron" target="_blank" rel="noreferrer" className="fn-icon-btn" title="GitHub">
                            <FaGithub />
                        </a>
                        <button className="fn-cv-btn">
                            CV <FaDownload size={11} />
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button className="fn-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </nav>

            {/* Mobile drawer */}
            <div className={`fn-drawer ${menuOpen ? 'fn-drawer-open' : ''}`}>
                <div className="fn-drawer-inner">
                    {NAV_LINKS.map(({ id, label }) => (
                        <button
                            key={id}
                            className={`fn-drawer-link ${activeId === id ? 'fn-drawer-active' : ''}`}
                            onClick={() => scrollTo(id)}
                        >
                            {label}
                        </button>
                    ))}
                    <div className="fn-drawer-divider" />
                    <div className="fn-drawer-socials">
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="fn-icon-btn"><FaLinkedin /></a>
                        <a href="https://github.com/AAGCAaron" target="_blank" rel="noreferrer" className="fn-icon-btn"><FaGithub /></a>
                    </div>
                    <button className="fn-cv-btn w-100">Descargar CV <FaDownload size={11} /></button>
                </div>
            </div>

            {/* Backdrop for mobile */}
            {menuOpen && <div className="fn-backdrop" onClick={() => setMenuOpen(false)} />}
        </>
    );
};

export default Navbar;
