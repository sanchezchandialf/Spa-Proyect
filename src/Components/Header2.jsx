import SpaFinal from "../assets/SpaFinal.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Logo = () => {
  return (
    <Link to="/inicio" className="flex items-center">
      <img src={SpaFinal} className="h-8 w-auto sm:h-10" alt="Flowbite Logo" />
      <span className="ml-3 text-2xl font-bold text-gray-700 dark:text-white">
        Sentirse Bien
      </span>
    </Link>
  );
};

const NavigationElement = ({ text, path }) => {
  return (
    <Link
      to={path}
      className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
    >
      {text}
    </Link>
  );
};

const Header2 = ({ onLoginClick, onRegisterClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigationItems = [
    { text: "Inicio", path: "/inicio" },
    { text: "Servicios", path: "/servicios" },
    { text: "Contacto", path: "/contacto" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex justify-start items-center">
            <Logo/>
          </div>

          <div className="hidden md:flex space-x-8">
          {navigationItems.map((item) => (
              <NavigationElement key={item.text} text={item.text} path={item.path} />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onLoginClick}
              className="cursor-pointer text-white bg-pink-500 hover:bg-opacity-75 font-medium rounded-lg text-sm px-4 py-2"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={onRegisterClick}
              className="cursor-pointer text-white bg-pink-500 hover:bg-opacity-75 font-medium rounded-lg text-sm px-4 py-2"
            >
              Registrarse
            </button>
          </div>

          {/* Botón para abrir/cerrar el menú en dispositivos pequeños */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
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

        {/* Menú colapsado para móviles */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-4">
            {navigationItems.map((item) => (
              <NavigationElement key={item.text} text={item.text} path={item.path} />
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header2;
