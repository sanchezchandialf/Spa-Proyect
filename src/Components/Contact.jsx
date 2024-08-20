import React from 'react';
import { InputComponent } from './ui/InputComponent';
import { ButtonComponent } from './ui/ButtonComponent';

const Contact = () => {
  return (
    <div className="bg-gray-100 py-16 px-6">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl  text-gray-700 font-bold text-[#7eae66] mb-6" >Contáctanos</h2>
        <p className="text-gray-700 mb-8">
          ¡Nos encantaría saber sobre vos! Ya sea que tengas una pregunta sobre nuestros servicios, precios, o cualquier otra cosa, nuestro equipo está listo para responder a todas tus preguntas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-[#d02d69] mb-4">Estamos en</h3>
            <p className="text-gray-700 mb-2">Ayacucho 428 ,Resistencia,Chaco</p>
            <p className="text-gray-700 mb-4">Teléfono: 3624604474</p>
            <p className="text-gray-700">Email: lautarosanche@gmail.com</p>
          </div>

          <div className="w-full h-64 bg-[#88354f]">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.219176239947!2d-122.4194150846839!3d37.7749297797589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c0f6b2a1f%3A0xf2e740c8e8f8f9a!2sGolden%20Gate%20Park%2C%20San%20Francisco%2C%20CA%2094131%2C%20USA!5e0!3m2!1ses!2s!4v1628789280024!5m2!1ses!2s"
              allowFullScreen=""
              loading="lazy"
              title="Nuestra Ubicación"
            ></iframe>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-[#a72153] mb-4">Envíanos un Mensaje</h3>
          <form className="max-w-md mx-auto">
            <InputComponent type="text" placeholder="Tu Nombre" />
            <InputComponent type="email" placeholder="Tu Email" />
            <InputComponent type="textarea" placeholder="Tu Mensaje" rows="5" />
            <ButtonComponent>Enviar Mensaje</ButtonComponent>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
