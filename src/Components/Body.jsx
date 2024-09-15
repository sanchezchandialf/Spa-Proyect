import React, { useState } from 'react';
import { ButtonComponent } from "./ui/ButtonComponent";
import GaleriaP from './GaleriaP';
import Turnos from '../Pages/Turnos';
import WelcomeSection from './ui/Welcome';
import ServiciosPresentacion from './ui/ServiciosPresentacion';

import SpaNumbers from './ui/NumberComponent';
import CallToAction from './ui/CalltoAccion';
import Contact from './Contact';
import Carrusel from './Carrusel';

const Body = () => {
  const [showTurno, setShowTurno] = useState(false);

  const handleTurnoClick = () => {
    setShowTurno(true);
  }

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <main className="w-full">
        
        <WelcomeSection />
        <ServiciosPresentacion />
        <CallToAction />

        <section className="py-16 bg-gray-50 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Grid Left */}
              <div className="flex flex-col justify-center relative">
                <h2 className="text-6xl md:text-8xl font-semibold mb-6 md:mb-8 text-left text-gray-900 leading-tight tracking-tight">
                  Visítanos.
                </h2>
                <p className="mb-4 md:mb-6 text-xl md:text-2xl leading-relaxed text-gray-700 max-w-3xl">
                  Experimente la sensación de bienestar por sí mismo.
                </p>
                <p className="mb-8 md:mb-10 text-base md:text-lg leading-relaxed text-gray-600 max-w-2xl">
                  Reserve su día de spa hoy y embárquese en un viaje de relajación y rejuvenecimiento.
                </p>
                {/* Central Button Container */}
                <div className="absolute inset-x-0 bottom-0 flex justify-center">
                  <ButtonComponent
                    size="lg"
                    onClick={handleTurnoClick}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:-translate-y-1"
                  >
                    Pedir un Turno
                  </ButtonComponent>
                </div>
              </div>

              {/* Grid Right */}
              <div className="flex items-start justify-center">
                <SpaNumbers />
              </div>
            </div>
          </div>
          {showTurno && <Turnos onClose={() => setShowTurno(false)} />}
        </section>
      
        <Contact/>
        
      </main>
    </div>
  );
};

export default Body;