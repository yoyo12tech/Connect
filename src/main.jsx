import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react';
import App from './App.jsx'
import AuthContextProvider from './context/authContext.jsx';
import './index.css'
import "@fortawesome/fontawesome-free/css/all.min.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthContextProvider>
        <App/>
      </AuthContextProvider>
    </HeroUIProvider>
  </StrictMode>
)
