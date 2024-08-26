import React from 'react';
import Equipo from "../assets/Equipo.jpg";
import Tratamientos from "../assets/Tratamientos.jpg";
import Filosofia from "../assets/Filosofia.jpg";
import MasajesS from "../assets/MasajesSala.jpeg";  // Ajustar la importación si hay duplicado
import Aroma from "../assets/Aroma.jpg";
import Reflexo from "../assets/Reflexo.jpg";
import Piedras from "../assets/Piedras.jpg";
import Vistas from './ui/vistas';
import Sauna from "../assets/Sauna.jpeg";
import { ButtonComponent } from "./ui/ButtonComponent";
import Carrusel from './ui/Carrusel';
import Masajes from "../assets/Masajes.jpg";
import GaleriaP from './GaleriaP';
const fotos = [
  {
    title: 'Sala de spa',
    description: ' En nuestro exclusivo centro de spa, hemos creado un entorno sereno y sofisticado donde cada detalle está diseñado para brindarte una experiencia de relajación inigualable. Nuestra Sala de Spa cuenta con un ambiente cálido y acogedor, decorado con tonos suaves y materiales naturales que evocan la paz y la calma.',
    image: MasajesS, // Usar la importación única y correcta
  },
  {
    title: 'Sauna de spa',
    description: 'Descubre el lujo de la auténtica relajación en nuestro Sauna, el refugio perfecto para revitalizar tu cuerpo y mente. Nuestro sauna está diseñado para ofrecerte una experiencia de bienestar total en un ambiente de elegante simplicidad. La estructura de madera de alta calidad, combinada con una iluminación suave, crea un entorno cálido y acogedor que invita al descanso y la introspección.',
    image: Sauna,
  }
];

const Galeria = ({ fotos }) => {
  return (
    <div>
      {fotos.map((foto, index) => (
        <div key={index} className="flex flex-col md:flex-row items-center mb-12">
          <img
            src={foto.image}
            alt={foto.title}
            className="w-full h-[300px] object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
          />
          <div className="text-lg">
            <h3 className="text-2xl font-bold mb-2">{foto.title}</h3>
            <p>{foto.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
const treatments = [
  {
    name: 'Masaje Relajante',
    description: 'Un masaje para aliviar el estrés y la tensión muscular.',
    image: Masajes,  // Usar la importación única y correcta
  },
  {
    name: 'Terapia de Piedras Calientes',
    description: 'Relaja tus músculos con el calor de las piedras volcánicas.',
    image: Piedras,
  },
  {
    name: 'Aromaterapia',
    description: 'Relájate con el poder curativo de los aceites esenciales.',
    image: Aroma,
  },
  {
    name: 'Terapia de Reflexología',
    description: 'Estimula los puntos de presión en los pies para mejorar el bienestar general.',
    image: Reflexo,
  },
];

const Body = () => {
  return (
    <div className='min-h-screen  bg-background text-foreground'>
      <header className="py- text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold  m-4  md:text-5xl text-center">Bienvenidos a <span className='font-bold'>Spa Sentirse Bien</span></h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        {/*
          NO TOQUES ESTO ESTOY PROBANDO
       <section className='mb-12'>
          <div className='relative h-[400px] rounded-lg overflow-hidden'>
            <img
              src={Tratamientos}
              alt="Spa interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-3">Bienvenido a Spa Sentirse Bien</h2>
                <p className="text-xl">Tu oasis de relajacion y rejuvenecimiento</p>
              </div>
            </div>
          </div>
        </section> */}

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 mx-auto text-center ">Nuestra Historia</h2>
          <p className="mb-4 text-center text-lg">
            Fundado en 2005, Sentirse Bien Spa Retreat ha sido un refugio para aquellos que buscan paz y
            Relajación en el corazón de la ciudad. Nuestro viaje comenzó con una visión simple: crear
            un espacio donde las personas podrían escapar del estrés de la vida diaria y encontrar la verdadera
            Rejuvenecimiento para el cuerpo, la mente y el espíritu.
          </p>
          <p className="mb-4 text-center text-lg">
            Buscamos atraer la atencion de nuestros clientes a traves de experiencias
            inspiradas en la seduccion de los sentidos.
            Adaptamos las propuestas con el objetivo de que logre desconectarse complemetamente de la rutina y disfrute de un momento de bienestar , en total armonia con la naturaleza
          </p>
        </section>
        <div>
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-center">Nuestros Servicios</h2>
            <Carrusel treatments={treatments} />
          </section>


        </div>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 mx-auto text-center">Nuestas Instalaciones</h2>
          <div className="grid grid-cols-1 gap-12">
            <GaleriaP />
          </div>
        </section>

        <section>
          <h2 className="text-7xl font-semibold mb-0 text-left py-8">Visitanos</h2>
          <p className="mb-4 text-xl ">
            Experimente la experiencia de Sentirse Bien por sí mismo.
           <p className='mb-4 '>Reserve su día de spa hoy y embárquese en un viaje de relajación y rejuvenecimiento.</p> 
          </p>
          <div className='mt-8'>
            <ButtonComponent size="sm">Pedi un Turno</ButtonComponent>
          </div>

        </section>
      </main>
    </div>
  );
};

export default Body;
