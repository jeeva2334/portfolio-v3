import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Note from './Note.jsx'
import { DataProvider } from './context/DataContext.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/note/:id" element={<Note />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  </StrictMode>,
)
