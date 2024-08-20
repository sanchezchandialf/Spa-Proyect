import React from 'react';
import Equipo from "../assets/Equipo.jpg";
import Tratamientos from "../assets/Tratamientos.jpg";
import Filosofia from "../assets/Filosofia.jpg";
const About = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl  font-extrabold text-gray-700 dark:text-white ">
            Bienvenidos a SPA SENTIRSE BIEN  
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
         Buscamos atraer la atencion de nuestros clientes a través de experiencias inspiradas en la seduccion de los sentidos.

          </p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Adaptamos las propuestas con el objetivo de que logre desconectarse completamente de la rutina  y disfrute de un momento de bienestar , en total armonia con la natulareza
          </p>




        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <div className="max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img
              src={Equipo}
              alt="Nuestro Equipo"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Nuestro Equipo
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Contamos con un equipo altamente capacitado y comprometido con tu bienestar. Cada miembro de nuestro equipo está dedicado a ofrecerte el mejor servicio.
              </p>
            </div>
          </div>

          <div className="max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img
              src={Filosofia}
              alt="Nuestra Filosofía"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Nuestra Filosofía
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Creemos en el poder de la relajación y la renovación. Nuestros tratamientos están diseñados para ayudarte a alcanzar el equilibrio perfecto entre cuerpo y mente.
              </p>
            </div>
          </div>

          <div className="max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img
              src={Tratamientos}
              alt="Nuestros Servicios"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Nuestros Servicios
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Ofrecemos una variedad de tratamientos adaptados a tus necesidades. Desde masajes relajantes hasta terapias de belleza, tenemos todo lo que necesitas para un día perfecto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
