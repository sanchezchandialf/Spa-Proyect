import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import App2 from './App2'
import { AuthProvider } from './context/AuthProvider'






createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<App2/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
