import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react';
import App from './App.jsx'
import AuthContextProvider from './context/authContext.jsx';
import './index.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

export const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <App/>
        </AuthContextProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  </StrictMode>
)

