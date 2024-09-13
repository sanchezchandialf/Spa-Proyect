import React from 'react';
import ComentarioForm from './ComentarioForm';

const ComentariosSection = () => {
  return (
    <div className="w-full py-12 bg-white text-black">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-6xl font-bold mb-8 text-center">¡Queremos saber tu opinión!</h2>
        <ComentarioForm />
      </div>
    </div>
  );
};

export default ComentariosSection;
