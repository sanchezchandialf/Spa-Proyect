import React from 'react';
import ContainerFluido from '../../UtilitiesGenericas/Container';
import SpaNumbers from "../../Components/ui/NumberComponent";
import Bienvenidafoto from '../../assets/Bienvenidafoto.jpg';
import StaticBanner from '../Utilites/Banner';

const items = [
  "Aromaterapia para aliviar el estrés y promover la relajación.",
  "Tratamientos faciales lujosos que rejuvenecen tu piel y espíritu.",
];

const WelcomeSection = () => {
  return (
    <div className="flex flex-col">
      {/* <div className="w-full">
        <StaticBanner items={items} />
      </div> */}
      <div className="w-full "> {/* Añadido margen superior */}
        <ContainerFluido
          imageSrc={Bienvenidafoto}
          imageAlt="Descripción de la imagen"
          columnTitle="Bienvenido a Spa Sentirse Bien"
          columnText="Fundado en 2005, Sentirse Bien Spa Retreat ha sido un refugio para aquellos que buscan paz y relajación en el corazón de la ciudad. Nuestro viaje comenzó con una visión simple: crear un espacio donde las personas podrían escapar del estrés de la vida diaria y encontrar la verdadera rejuvenecimiento para el cuerpo, la mente y el espíritu"
        />
      </div>
      <div className="w-full"> 
        <StaticBanner items={items} />
      </div>
      {/* <div className="w-full mt-4 md:mt-8">
        <SpaNumbers />
      </div> */}
    </div>
  );
};

export default WelcomeSection;