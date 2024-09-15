// src/components/NewsCarousel.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const newsItems = [
    {
      id: 1,
      title: 'Promoción de Masajes para la Primavera',
      description: 'Disfruta de un masaje relajante en nuestro spa a un precio especial durante el mes de septiembre.',
      image: 'https://via.placeholder.com/1200x600',
    },
    {
      id: 2,
      title: 'Próximos Cursos de Raiki',
      description: 'Estamos emocionados de anunciar que pronto ofreceremos cursos de Raiki para aquellos interesados en aprender esta técnica de sanación.',
      image: 'https://via.placeholder.com/1200x600',
    },
    {
      id: 3,
      title: 'Se Buscan Trabajadores para Nuestro Equipo',
      description: 'Estamos buscando personas apasionadas y comprometidas para unirse a nuestro equipo de masajistas y terapeutas.',
      image: 'https://via.placeholder.com/1200x600',
    },
    {
      id: 4,
      title: 'Nuevas Instalaciones en Construcción',
      description: 'Estamos emocionados de anunciar que pronto inauguraremos nuevas instalaciones para ofrecer un servicio aún más completo y relajante a nuestros clientes.',
      image: 'https://via.placeholder.com/1200x600',
    },
  ];

export const NewsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
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
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-8">
              <h2 className="text-4xl font-bold mb-4 text-[#d19793]">{news.title}</h2>
              <p className="text-xl mb-6">{news.description}</p>
              <button className="px-6 py-3 bg-[#545b55] text-[#ccc7ae] font-semibold rounded-lg hover:bg-[#d19793] transition">
                Leer más
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

