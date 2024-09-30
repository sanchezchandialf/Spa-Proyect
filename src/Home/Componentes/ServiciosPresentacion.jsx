import React from 'react';
import ContainerFluido2 from '../../UtilitiesGenericas/Container2';
import Toallas from '../../assets/Toallas.jpg';

const ServiciosPresentacion = () => {
  return (
    <div className="w-full h-full bg-[#212121] py-8"> {/* Fondo Oxford Blue y relleno vertical */}
      <ContainerFluido2
        imageSrc={Toallas}
        imageAlt="Descripción de la imagen"
      />
    </div>
  );
};

export default ServiciosPresentacion;
