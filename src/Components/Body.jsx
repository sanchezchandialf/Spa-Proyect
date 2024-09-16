import React, { useState } from 'react';
import WelcomeSection from './ui/Welcome';
import ServiciosPresentacion from './ui/ServiciosPresentacion';
import CallToAction from './ui/CalltoAccion';
import Contact from './Contact';

const Body = () => {
  const [showTurno, setShowTurno] = useState(false);

  const handleTurnoClick = () => {
    setShowTurno(true);
  };
 
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="w-full">
        {/* Sección de Bienvenida */}
        <section className="w-full -mt-4 md:-mt-8">
          <WelcomeSection />
        </section>

        {/* Servicios Presentación */}
        <section className="w-full bg-white">
          <ServiciosPresentacion />
        </section>

        {/* Llamada a la acción */}
        <section className="w-full bg-gray-100">
          <CallToAction />
        </section>

        {/* Contacto */}
        <section className="w-full bg-gray-200">
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default Body;