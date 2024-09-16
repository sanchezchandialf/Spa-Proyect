import SpaFinal from "../assets/SpaFinal.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from '../context/LoginContext';
import { useAuth } from '../context/AuthContext';

const Logo = () => (
  <Link to="/" className="flex items-center">
    <img src={SpaFinal} className="h-8 w-auto sm:h-10" alt="Logo Sentirse Bien" />
    <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">Sentirse Bien</span>
  </Link>
);

const NavigationElement = ({ text, path }) => (
  <Link
    to={path}
    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
  >
    {text}
  </Link>
);

const Header2 = () => {
  const { esCliente, esProfesional, esAdmin, hayUsuario, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { handleRegisterClick, handleLoginClick, handleRegisterProfesionalClick } = useLogin();

  const navigationItems = [
    { text: "Inicio", path: "/" },
    { text: "Servicios", path: "/servicios" },
    { text: "Contacto", path: "/contacto" },
    esProfesional() && { text: "PagProfesional", path: "/profesional" },
    esCliente() && { text: "Mis Turnos", path: "/MisTurnos" }
  ].filter(Boolean);

  return (
    <header className="fixed top-0 left-0 w-screen bg-white dark:bg-gray-800 shadow-md z-50 overflow-x-hidden"> {/* Cambié w-full a w-screen y agregué overflow-x-hidden */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Logo />
          
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map(item => (
              <NavigationElement key={item.text} text={item.text} path={item.path} />
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {hayUsuario() ? (
              <>
                <button
                  onClick={logout}
                  className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-4 py-2 transition-colors"
                >
                  Cerrar Sesión
                </button>

                {esAdmin() && (
                  <button
                    onClick={handleRegisterProfesionalClick}
                    className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-4 py-2 transition-colors"
                  >
                    Registrar Profesional
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-4 py-2 transition-colors"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-4 py-2 transition-colors"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden flex flex-col space-y-2 mt-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            {navigationItems.map(item => (
              <NavigationElement key={item.text} text={item.text} path={item.path} />
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header2;
