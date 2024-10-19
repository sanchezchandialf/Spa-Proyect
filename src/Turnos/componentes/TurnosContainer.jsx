import React from 'react';
import TurnoCard from '../utilidades/TurnoCard';

const TurnosContainer = ({ turnos, onTurnoUpdated }) => {
  if (turnos.length === 0) {
    return <p className="text-gray-500">No hay turnos para mostrar.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {turnos.map(turno => (
        <TurnoCard key={turno.idTurno} turno={turno} onTurnoUpdated={onTurnoUpdated} />
      ))}
    </div>
  );
};

export default TurnosContainer;
