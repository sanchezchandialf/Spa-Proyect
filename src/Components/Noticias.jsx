// src/components/NewsCarousel.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Bann from "../assets/Bann.jpg";
import Banner from '../assets/Banner.jpg';
import PromoInvierno from '../assets/PromoInvierno.jpg';
import fotopresentacion from '../assets/fotopresentacion.jpg';
import Piedras from '../assets/Piedras.jpg';
import Reiki from '../assets/reiki.jpg';
const newsItems = [
  {
    id: 1,
    title: 'Promoción de Masajes para la Primavera',
    description: 'Disfruta de un masaje relajante en nuestro spa a un precio especial durante el mes de septiembre.',
    image: Bann,
    link: '/servicios', // Ruta específica
  },
  {
    id: 2,
    title: 'Próximos Cursos de Reiki',
    description: 'Estamos emocionados de anunciar que pronto ofreceremos cursos de Raiki para aquellos interesados en aprender esta técnica de sanación.',
    image: Reiki,
    link: '/servicios', // Ruta específica
  },
  {
    id: 3,
    title: 'Se Buscan Trabajadores para Nuestro Equipo',
    description: 'Estamos buscando personas apasionadas y comprometidas para unirse a nuestro equipo de masajistas y terapeutas.',
    image: fotopresentacion,
    link: '/contacto'
  },
 
];

export const NewsCarousel = () => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    swipe: true,  // Permite deslizar con el dedo en pantallas táctiles
    arrows: true, // Muestra flechas de navegación a los lados del carrusel
  };
  

  const handleNavigate = (link) => {
    navigate(link); // Navega a la página indicada
  };

  return (
    <div className="w-screen h-screen">
    <Slider {...settings}>
      {newsItems.map((news) => (
        <div key={news.id} className="relative w-full h-screen">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex flex-col justify-center items-center text-center text-gray-200 p-8">
            <h2 className="text-3xl font-medium mb-4 text-white">{news.title}</h2>
            <p className="text-lg mb-6">{news.description}</p>
            <button
              onClick={() => handleNavigate(news.link)}
              className="px-6 py-3 bg-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition"
            >
              Leer más
            </button>
          </div>
        </div>
      ))}
    </Slider>
  </div>
  );
};
