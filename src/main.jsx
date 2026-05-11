import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'

console.log(
  "%c👨‍💻 ¡Hola, reclutador/desarrollador!\n%cVeo que te gusta mirar bajo el capó. Mi código está limpio, mi café está listo y estoy buscando nuevos retos. ¡Hablemos!\n%c✉️ aldo.gutierrez@email.com",
  "color: #3b82f6; font-size: 20px; font-weight: bold; font-family: monospace;",
  "color: #cbd5e1; font-size: 14px; font-family: monospace; margin-top: 5px;",
  "color: #93c5fd; font-size: 14px; font-weight: bold; font-family: monospace; margin-top: 5px;"
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
