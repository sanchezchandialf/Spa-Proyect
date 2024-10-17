import React, { useState } from 'react';

import ConsultaDetail from '../../Contact/Components/ConsultaDetail';

import ConsultasList from './ConsultaList';
import Responder from '../../Contact/Components/Respuesta';

const ConsultasSection = () => {
    
  const [selectedConsulta, setSelectedConsulta] = useState(null); // Estado para la consulta seleccionada

  // Manejar la selección de una consulta
  const handleConsultaSelect = (consulta) => {
   
    setSelectedConsulta(consulta);
  };

  // Renderizado condicional: Si hay una consulta seleccionada, mostramos el detalle
  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna 1: Lista de Consultas */}
        <div className="md:col-span-1">
            <ConsultasList onConsultaSelect={handleConsultaSelect} />
        </div>

        {/* Columna 2: Detalles de la Consulta Seleccionada */}
        <div className="md:col-span-2">
          {selectedConsulta ? (
            <div>
              <ConsultaDetail consultaId={selectedConsulta.idConsulta} />
              {!selectedConsulta.contestado && (
               <Responder consultaId={selectedConsulta.idConsulta}  />
              )}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>Selecciona una consulta de la lista para ver más detalles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultasSection;
