import React from 'react';
import { ButtonComponent } from "./ui/ButtonComponent";
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
const preguntas = [
  
  {
    name: "Dirección",
    description: "Calle 123, Colonia Centro, Ciudad de México, C.P. 12345"
  },
  {
    name: "Telefono",
    description: "Telefonos: 01 800 123 4567"
  },
  {
    name: "Correo Electronico",
    description: "p2u9v@example.com"
  },
  {
    name: "Horario de Atención",
    description: "Lunes a Viernes de 9:00 a.m. a 6:00 p.m. y Sabados de 9:00 a.m. a 1:00 p.m."
  },
];

const Informaciones = () => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {preguntas.map((pregunta, index) => (
          <div key={index} className="p-6 space-y-3 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{pregunta.name}</h3>
            <p className="text-muted-foreground">{pregunta.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen text bg-[#cc5862]">
    <header className="h-[60vh] flex flex-col items-center justify-center text-center text-white">
      <h1 className="text-8xl md:text-6xl font-bold">Contáctanos</h1>
      <p className="text-lg md:text-xl max-w-2xl mt-4">
        Si tienes alguna pregunta o necesitas ayuda, no dudes en comunicarte con nosotros.
      </p>
      <div className='mt-8'>
        <ButtonComponent size="sm"className="bg-white hover:bg-pink-500 text-pink-600 font-bold py-2 px-4 rounded">Enviar Mensaje</ButtonComponent>
      </div>
    </header>
  
    <main className="flex-grow container mx-auto px-2 py-2 md:py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0167132768424!2d-58.4395!3d-34.5884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb59c771eb933%3A0x6b3113b596d78c69!2sVirrey%20del%20Pino%202237%2C%20C1426%20CABA%2C%20Argentina!5e0!3m2!1sen!2sus!4v1629890657876!5m2!1sen!2sus"
            className="w-full h-[400px] rounded-lg shadow-md"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="w-full md:w-1/2">
          <Informaciones />
        </div>
      </div>
    </main>
  </div>
  );
};

export default Contact;






















 