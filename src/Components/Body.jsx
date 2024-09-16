import React, { useState } from 'react';
import { ButtonComponent } from "./ui/ButtonComponent";
import GaleriaP from './GaleriaP';
import Turnos from '../Pages/Turnos';
import WelcomeSection from './ui/Welcome';
import ServiciosPresentacion from './ui/ServiciosPresentacion';

import SpaNumbers from './ui/NumberComponent';
import CallToAction from './ui/CalltoAccion';
import Contact from './Contact';
import { NewsCarousel } from './ui/Noticias';


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
        <Contact/>
        
      </main>
    </div>
  );
};

export default Body;