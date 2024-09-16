import React, { useEffect } from 'react';
import ConsultaForm from '../Components/ui/ConsultaForm';
import EmpleoList from '../Components/ui/EmpleoList';

function PagContacto() {
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
    <div className="min-h-screen bg-[#c5dce3] text-gray-900">
      {/* Sección del Formulario de Consulta */}
      <section className="w-full pt-0 pb-8 md:pb-16 -mt-4 md:-mt-8">
        <div className="container mx-auto px-4">
          <ConsultaForm />
        </div>
      </section>

      {/* Sección de la Lista de Empleos */}
      <section className="w-full py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <EmpleoList />
        </div>
      </section>
    </div>
  );
}

export default PagContacto;