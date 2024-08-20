import { useState, useEffect } from 'react';
import Masajes from "../assets/Masajes.jpg";
import Aroma from "../assets/Aroma.jpg";
import Facial2 from "../assets/Facial2.jpg";
import Reflexo from "../assets/Reflexo.jpg";
import Piedras from "../assets/Piedras.jpg";
const treatments = [
  {
    name: 'Masaje Relajante',
    description: 'Un masaje para aliviar el estrés y la tensión muscular.',
    image: Masajes,
  },
  {
    name: 'Terapia de Piedras Calientes',
    description: 'Relaja tus músculos con el calor de las piedras volcánicas.',
    image: Piedras,
  },
 
  {
    name: 'Aromaterapia',
    description: 'Relájate con el poder curativo de los aceites esenciales.',
    image: Aroma,
  },
  {
    name: 'Terapia de Reflexología',
    description: 'Estimula los puntos de presión en los pies para mejorar el bienestar general.',
    image: Reflexo,
  },
];

const Body = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevCurrent) => (prevCurrent + 1) % treatments.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-700 dark:text-white mb-12 text-center">
          Nuestros Tratamientos
        </h2>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {treatments.map((treatment, index) => (
              <div key={index} className="min-w-full">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="w-full h-96 object-cover object-center rounded-lg shadow-md"
                  style={{ objectFit: 'cover' }} // Asegura que la imagen cubra todo el contenedor sin distorsionarse
                />
                <div className="mt-6">
                  <h3 className="text-3xl font-semibold text-gray-900 dark:text-white text-center">
                    {treatment.name}
                  </h3>
                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 text-center">
                    {treatment.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              onClick={() =>
                goToSlide((current - 1 + treatments.length) % treatments.length)
              }
              className="text-gray-800 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
            >
              &lt;
            </button>
            <button
              onClick={() => goToSlide((current + 1) % treatments.length)}
              className="text-gray-800 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
            >
              &gt;
            </button>
          </div>
          <div className="flex justify-center mt-6">
            {treatments.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`mx-2 w-4 h-4 rounded-full ${
                  current === index ? 'bg-pink-500' : 'bg-gray-400'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Body;
