import React from 'react';
import Carrusel from './ui/Carrusel';
import Bann from "../assets/Bann.jpg";
import Banner from '../assets/Banner.jpg';
import PromoInvierno from '../assets/PromoInvierno.jpg';
const Promos = [
    {
      name : "Promociones",
      description : "Regala una experiencia de SPA",
      image :Bann
    },
    {
      name : "3 CUOTAS SIN INTERES",
      description : "en todos nuestros tratamientos",
      image : Banner,
    }
    ,
    {
      name : "Promociones",
      description : " Especiales de invierno",
      image : PromoInvierno
    }
]


const Portada = () => {
    return (
        <Carrusel treatments={Promos} />


    );
}

export default Portada