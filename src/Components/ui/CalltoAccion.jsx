import React from 'react';

const CallToAction = () => {
  return (
    <section className="bg-[#26552d] h-screen flex flex-col justify-center items-center text-center p-4">
      {/* Texto Principal */}
      <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
        Queremos conocerte.
      </h1>
      {/* Subtítulo */}
      <p className="text-white text-lg md:text-xl mb-8">
        En Spa Sentirse Bien , Buscamos la mejor calidad, tanto profesional como humana.
      </p>
      {/* Botones */}
      <div className="flex gap-4">
        <button className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300">
          Contactate
        </button>
        <button className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300">
          Conoce más
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
