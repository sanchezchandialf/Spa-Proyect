import React from 'react';
import ConsultarTurnosSection from '../Components/ui/TurnosSection';
import ConsultasSection from '../Contact/Components/ConsultasSection';
import EmpleoListWithPostulaciones from '../Contact/Components/EmpleoListWithPostulaciones';

function PagProfesional() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Eliminé el padding aquí */}
      
      <div className="space-y-4 p-6"> {/* Agregué el padding aquí */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <ConsultasSection />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <EmpleoListWithPostulaciones />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <ConsultarTurnosSection />
        </div>
      </div>
    </div>
  );
}

export default PagProfesional;
