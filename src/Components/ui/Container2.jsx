import React from "react";

function ContainerFluido2({ imageSrc, imageAlt }) {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
        {/* Columna de imagen (a la izquierda) */}
        <div className="flex items-center justify-center bg-gray-200 overflow-hidden h-full">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Columna de texto (a la derecha) */}
        <div className="flex flex-col justify-center p-6 text-left h-full">
          <p className="text-8xl font-black mb-4 text-white">Nuestros Servicios</p>
          <button className="mt-4 px-6 py-3 bg-[#ded9d6] text-[#212121] font-semibold text-lg rounded-lg border border-[#bfbfbf] hover:bg-[#d0cfc9] transition duration-300">
            Conoce Más
          </button>

        </div>
      </div>
    </div>
  );
}

export default ContainerFluido2;
