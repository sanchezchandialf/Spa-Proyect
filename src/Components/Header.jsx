import SpaFinal from "../assets/SpaFinal.png";

const Logo = () => {
  return (<a href="/" className="flex items-center">
    <img
      src={SpaFinal}
      className="h-8 w-auto sm:h-10"
      alt="Flowbite Logo"
    />
    <span className="ml-3 text-2xl font-bold text-gray-700 dark:text-white">
      Sentirse Bien
    </span>
  </a>)
}
const NavigationElement = (props) => {
  return (<a
    href={`#${props.text}`}
    className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
  >
    {props.text}
  </a>)

}
const Header = () => {
  const navigationDescriptions = [
    "Inicio", "Servicios", "Sobre nosotros", "Contacto"
  ]
  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-lg z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {Logo()}
          <div className="hidden lg:flex space-x-6">
            {navigationDescriptions.map((text) => <NavigationElement key={text} text={text} />)}
          </div>
          <div className="flex items-center">
            <a
              href="#"
              className="text-gray-700 dark:text-white hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:text-rose-500 font-medium rounded-lg text-sm px-4 py-2 mr-2"
            >
              Iniciar Sesion
            </a>
            <a
              href="#"
              className="text-white bg-pink-500 hover:bg-pink-500 hover:bg-opacity-75 hover:text-white focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-600"
            >
              Registrate
            </a>


          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
