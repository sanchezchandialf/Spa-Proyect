import Carousel from 'react-bootstrap/Carousel';

function Carrusel({ treatments = [] }) {
  return (
     <Carousel>
      {treatments.map((treatment, index) => (
        <Carousel.Item  interval={1000} key={index}>
          <img
            src={treatment.image}
            alt={treatment.name}
            className="w-screen h-screen object-cover rounded-lg mb-4"
          />
          <Carousel.Caption className=' bg-black text-foreground bg-background rounded-lg '>
            <h3>{treatment.name}</h3>
            <p>{treatment.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel> 
  );
}

export default Carrusel;
