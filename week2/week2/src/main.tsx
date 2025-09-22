import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TodosProvider } from './context/TodosContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodosProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TodosProvider>
  </React.StrictMode>,
)
