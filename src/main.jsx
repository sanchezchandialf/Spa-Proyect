import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import Turnos from './Pages/Turnos.jsx'
import NotFound from './Pages/NotFound.jsx'
import Inicio from './Pages/Inicio.jsx'


const router = createBrowserRouter([
{
  path:'/',
  element: <Inicio />,
  errorElement:<NotFound/>
},

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
