import React from 'react';

export const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">{service.detallesServicio}</h2>
      <p className="text-gray-600">Duración: {service.duracionMinutos} minutos</p>
      <p className="text-gray-600 mb-2">Categoría: {service.categoria.nombre}</p>
      <p className="text-indigo-500 font-semibold">Precio: ${service.precio}</p>
      {service.disponible ? (
        <span className="inline-block bg-green-200 text-green-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
          Disponible
        </span>
      ) : (
        <span className="inline-block bg-red-200 text-red-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
          No disponible
        </span>
      )}
    </div>
  );
};


