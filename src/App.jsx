import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import AboutMe from './components/AboutMe';
import './App.css'; // Will be cleared but kept for any future app-wide styles

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div id="inicio"><Hero /></div>
      <div id="proyectos"><Projects /></div>
      <div id="experiencia"><Experience /></div>
      <div id="sobre-mi"><AboutMe /></div>
      <footer style={{ textAlign: 'center', padding: '20px', color: '#666', fontSize: '0.8rem' }}>
        &copy; {new Date().getFullYear()} Developer Portfolio. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
