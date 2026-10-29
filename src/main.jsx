import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MobileApp from './mobile/MobileApp.jsx'

const isMobile =
  window.location.pathname.startsWith('/mobile') || window.innerWidth < 768

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isMobile ? <MobileApp /> : <App />}
  </StrictMode>,
)
