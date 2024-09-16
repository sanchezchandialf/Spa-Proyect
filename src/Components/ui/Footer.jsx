import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#F6ECE8] text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Servicios</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800" href="/servicios">Masajes</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800" href="/servicios">Faciales</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800" href="/servicios">Aromaterapia</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Enlaces Rápidos</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800" href="/">Inicio</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800" href="/contacto">Contacto</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Síguenos</h2>
            <div className="flex justify-center md:justify-start">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Instagram</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Facebook</span>
              </a>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Newsletter</h2>
            <div className="flex xl:flex-nowrap md:flex-wrap justify-center items-end md:justify-start">
              <div className="relative sm:w-64 w-40 sm:mr-4 mr-2">
                <label htmlFor="footer-field" className="leading-7 text-sm text-gray-600">Correo Electrónico</label>
                <input type="text" id="footer-field" name="footer-field" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-[#D19793] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
              <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-[#D19793] border-0 py-2 px-6 focus:outline-none hover:bg-[#CC7A7A] rounded">Suscribirse</button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">© 2024 Grupo26 —
            <a href="#" className="text-gray-600 ml-1" target="_blank" rel="noopener noreferrer">Política de privacidad</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
