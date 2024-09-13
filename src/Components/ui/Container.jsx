import React from "react";

function ContainerFluido({ imageSrc, imageAlt, columnTitle, columnText }) {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
        {/* Columna de texto */}
        <div className="flex flex-col justify-center p-6 text-left">
          <h2 className="text-8xl font-black mb-4 text-black">{columnTitle}</h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-lg">{columnText}</p>
        </div>
        {/* Columna de imagen */}
        <div className="flex items-center justify-center bg-gray-200 overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}

export default ContainerFluido;