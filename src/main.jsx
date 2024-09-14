import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App2 from './App2'
import { AuthProvider } from './context/AuthContext';

import { LoginProvider,  } from './context/LoginContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LoginProvider>
          <Routes>
          <Route path='/*' element={<App2/>}/>
        </Routes>
        </LoginProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
