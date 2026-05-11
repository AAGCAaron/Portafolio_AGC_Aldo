import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';
import ParticlesBackground from './ParticlesBackground';
import './Hero.css';

// Typewriter hook
const useTypewriter = (lines, speed = 50) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];

    if (isTyping) {
      if (currentChar < line.text.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines(prev => {
            const next = [...prev];
            if (next.length <= currentLine) {
              next.push({ ...line, text: line.text.slice(0, currentChar + 1) });
            } else {
              next[currentLine] = { ...line, text: line.text.slice(0, currentChar + 1) };
            }
            return next;
          });
          setCurrentChar(c => c + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        // Line done, pause then go to next
        const timeout = setTimeout(() => {
          setCurrentLine(l => l + 1);
          setCurrentChar(0);
        }, line.pause || 400);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentLine, currentChar, isTyping, lines, speed]);

  return displayedLines;
};

const Hero = () => {
  const terminalLines = [
    { text: '$ whoami', type: 'command', pause: 300 },
    { text: 'Aldo Gutierrez — Software Engineer', type: 'response', pause: 500 },
    { text: '$ cat skills.json', type: 'command', pause: 300 },
    { text: '{ "languages": ["Python", "JS", "C++"],', type: 'json', pause: 100 },
    { text: '  "frameworks": ["React", "Node.js"],', type: 'json', pause: 100 },
    { text: '  "focus": "Clean code & Scalability" }', type: 'json', pause: 500 },
    { text: '$ git log --oneline -1', type: 'command', pause: 300 },
    { text: 'a3f9d21 feat: building the future 🚀', type: 'response', pause: 800 },
    { text: '$ _', type: 'cursor', pause: 9999 },
  ];

  const displayedLines = useTypewriter(terminalLines, 35);

  const scrollToProjects = () => {
    document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <ParticlesBackground />
      <Container className="hero-content">
        <Row className="align-items-center g-5">
          {/* Left: Text Content */}
          <Col lg={6} className="text-lg-start text-center">
            <div className="hero-badge mb-4">
              <span className="badge-dot"></span>
              <span>Disponible para proyectos</span>
            </div>
            <h1 className="hero-name">Aldo<br />Gutierrez</h1>
            <h2 className="hero-role mb-4">
              <span className="role-highlight">Software Engineer</span>
              <br />
              <span className="role-secondary">& Full Stack Developer</span>
            </h2>
            <p className="hero-description mb-5">
              Diseño y construyo sistemas escalables con código limpio. Especializado en arquitectura de software, APIs de alto rendimiento y experiencias de usuario que impresionan.
            </p>
            <div className="hero-actions d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-primary-custom">
                <FaGithub /> Ver GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn-secondary-custom">
                <FaLinkedin /> LinkedIn
              </a>
            </div>
            <button className="scroll-cta mt-5" onClick={scrollToProjects}>
              <FaArrowDown className="bounce" /> Ver mis proyectos
            </button>
          </Col>

          {/* Right: Terminal */}
          <Col lg={6}>
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="terminal-title">bash — aldo@dev:~/portfolio</span>
              </div>
              <div className="terminal-body">
                {displayedLines.map((line, i) => (
                  <div key={i} className={`terminal-line type-${line.type}`}>
                    {line.type === 'command' && <span className="prompt">❯</span>}
                    {line.type === 'cursor'
                      ? <span className="prompt">❯ <span className="cursor-blink">█</span></span>
                      : <span className="line-text">{line.text.replace(/^\$ /, '')}</span>
                    }
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="hero-background-glow"></div>
    </section>
  );
};

export default Hero;
