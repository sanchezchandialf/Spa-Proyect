import React, { useState } from 'react';
import WelcomeSection from './ui/Welcome';
import ServiciosPresentacion from './ui/ServiciosPresentacion';
import CallToAction from './ui/CalltoAccion';
import Contact from './Contact';
import { NewsCarousel } from './Noticias';


const Body = () => {
  const [showTurno, setShowTurno] = useState(false);

  const handleTurnoClick = () => {
    setShowTurno(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="w-screen overflow-x-hidden"> {/* Asegura que el main ocupe todo el ancho */}
        {/* Sección de Bienvenida */}
        <section className="w-full -mt-4 md:-mt-8 max-w-none"> {/* Añadimos max-w-none */}
          <WelcomeSection />
        </section>

        {/* Servicios Presentación */}
        <section className="w-full bg-white max-w-none"> {/* Añadimos max-w-none */}
          <ServiciosPresentacion />
        </section>

        {/* Llamada a la acción */}
        <section className="w-full bg-gray-100 max-w-none"> {/* Añadimos max-w-none */}
          <CallToAction />
        </section>

        {/* Carousel de noticias */}
        <section className="w-full bg-white max-w-none"> {/* Aseguramos ancho completo */}
          <NewsCarousel />
        </section>

        {/* Contacto */}
        <section className="w-full bg-gray-200 max-w-none"> {/* Añadimos max-w-none */}
          <Contact />
        </section>

        {/* Footer */}
       
      </main>
    </div>
  );
};

export default Body;
