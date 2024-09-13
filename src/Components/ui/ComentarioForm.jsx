import React, { useState } from 'react';
import axios from '../../api/axios';

/**
 * ComentarioForm
 *
 * Formulario para que los usuarios puedan enviar sus comentarios sobre
 * el sitio web.
 *
 * @returns {JSX.Element} Un JSX.Element que representa el formulario.
 */
const ComentarioForm = () => {
  const [comentario, setComentario] = useState('');
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/comentario/crear', {
        nombre,
        comentario,
      });
      setMensaje('Comentario enviado con éxito');
      setComentario('');
      setNombre('');
    } catch (error) {
      setMensaje('Error al enviar el comentario');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Déjanos tu Comentario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-lg font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="comentario" className="block text-lg font-medium text-gray-700 mb-1">Comentario</label>
          <textarea
            id="comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-[#212121] text-white font-semibold text-lg rounded-lg border border-[#bfbfbf] hover:bg-[#333333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#212121] transition duration-300"
        >
          Enviar Comentario
        </button>
      </form>
      {mensaje && <p className="mt-4 text-lg text-gray-600">{mensaje}</p>}
    </div>
  );
};

export default ComentarioForm;
