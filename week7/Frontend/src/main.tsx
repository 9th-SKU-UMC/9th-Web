import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { SidebarProvider } from './Hooks/SidebarProvider.tsx'
import { ModalControllProvider } from './Hooks/ModalControllProvider.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <SidebarProvider>
      <ModalControllProvider>
        <App />
      </ModalControllProvider>
    </SidebarProvider>
  // </StrictMode>,
)