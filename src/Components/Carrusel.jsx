import Carousel from 'react-bootstrap/Carousel';

// Datos ficticios para el carrusel
const treatments = [
  {
    name: 'Masaje Relajante',
    description: 'Disfruta de un masaje profundo para liberar el estrés y mejorar tu bienestar.',
    image: 'https://www.example.com/imagen-masaje.jpg', // Cambia esta URL por una imagen válida
  },
  {
    name: 'Facial Rejuvenecedor',
    description: 'Devuelve el brillo y la vitalidad a tu piel con nuestro tratamiento facial rejuvenecedor.',
    image: 'https://www.example.com/imagen-facial.jpg', // Cambia esta URL por una imagen válida
  },
  {
    name: 'Terapia de Aromaterapia',
    description: 'Sumérgete en un ambiente de relajación total con nuestra exclusiva aromaterapia.',
    image: 'https://www.example.com/imagen-aromaterapia.jpg', // Cambia esta URL por una imagen válida
  },
];

function Carrusel() {
  return (
    <Carousel>
      {treatments.map((treatment, index) => (
        <Carousel.Item interval={1000} key={index}>
          <img
            src={treatment.image}
            alt={treatment.name}
            className="w-screen h-screen object-cover rounded-lg mb-4"
          />
          <Carousel.Caption className="bg-black bg-opacity-50 text-white rounded-lg p-4">
            <h3>{treatment.name}</h3>
            <p>{treatment.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carrusel;
