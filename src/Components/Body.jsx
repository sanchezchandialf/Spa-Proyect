import React, { useState } from 'react';
import { ButtonComponent } from "./ui/ButtonComponent";
import GaleriaP from './GaleriaP';
import Turnos from '../Pages/Turnos';
import WelcomeSection from './ui/Welcome';
import ServiciosPresentacion from './ui/ServiciosPresentacion';
import ComentariosSection from './ui/ComentarioSeccion';
import SpaNumero from './ui/SpaShow';

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
        <ComentariosSection />
        <SpaNumero />
        
        <section className="mb-16">
          <h2 className="text-5xl font-bold mb-8 text-center">Nuestras Instalaciones</h2>
          <div className="grid grid-cols-1 gap-12">
            <GaleriaP />
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-6xl font-semibold mb-6 text-left">Visítanos</h2>
            <p className="mb-4 text-xl leading-relaxed text-gray-700">
              Experimente la sensación de bienestar por sí mismo.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              Reserve su día de spa hoy y embárquese en un viaje de relajación y rejuvenecimiento.
            </p>
            <div className='mt-8'>
              <ButtonComponent size="lg" onClick={handleTurnoClick}>Pedir un Turno</ButtonComponent>
            </div>
          </div>
          {showTurno && <Turnos onClose={() => setShowTurno(false)} />}
        </section>
      </main>
    </div>
  );
};

export default Body;