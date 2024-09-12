import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header2 from "./Header2";
import Contact from "./Contact";
import Portada from "./Portada";
import Login from "./Login";
import Register from "./Register";
import React, { useState, useEffect } from 'react';


const Layout =()=>{
    const location = useLocation(); // Obtener la ubicación actual
    const navigate = useNavigate(); // Para navegar entre rutas
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    // Abrir los modales dependiendo de la ruta
    useEffect(() => {
    if (location.pathname === "/login") {
      setIsLoginOpen(true);
    } else {
      setIsLoginOpen(false);
    }
    if (location.pathname === "/register") {
      setIsRegisterOpen(true);
    } else {
      setIsRegisterOpen(false);
    }
  }, [location]);

   // Cerrar el modal y navegar a la ruta de inicio
   const handleCloseModal = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    navigate("/inicio");
  };

    return(
        <main>
            <Header2 
            onRegisterClick={() => navigate('/register')}
            onLoginClick={() => navigate('/login')}
            />

            {/* Ventanas modales para Login y Register
            <Login isOpen={isLoginOpen} onClose={handleCloseModal} />
            <Register isOpen={isRegisterOpen} onClose={handleCloseModal} /> */}

            <Portada/>

            <Outlet />

            <Contact/>
        </main>
    )
}

export default Layout