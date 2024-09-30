import React from 'react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate(); // Define navigate here

  return (
    <section className="bg-[#26552d] h-screen flex flex-col justify-center items-center text-center p-4">
      {/* Texto Principal */}
      <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
        Queremos conocerte.
      </h1>
      {/* Subtítulo */}
      <p className="text-white text-lg md:text-xl mb-8">
        En Spa Sentirse Bien, buscamos la mejor calidad, tanto profesional como humana.
      </p>
      {/* Botones */}
      <div className="flex gap-4">
        <button 
          onClick={() => navigate('/contacto')} 
          className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300"
        >
          Contáctate
        </button>
        <button 
          onClick={() => navigate('/servicios')} 
          className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300"
        >
          Conoce más
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
