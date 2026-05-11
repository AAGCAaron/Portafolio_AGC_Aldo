import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import GitHubStats from './components/GitHubStats';
import Experience from './components/Experience';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div id="inicio"><Hero /></div>
      <div id="skills"><TechStack /></div>
      <div id="proyectos"><Projects /></div>
      <div id="github"><GitHubStats /></div>
      <div id="experiencia"><Experience /></div>
      <footer className="site-footer">
        <p>
          Diseñado & construido por <strong>Aldo Gutierrez</strong> —{' '}
          <code className="footer-code">v2.0.0</code>
        </p>
        <p className="footer-sub">© {new Date().getFullYear()} · Abre la consola del navegador 👀</p>
      </footer>
    </div>
  );
}

export default App;
