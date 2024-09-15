import React, { useState } from 'react';
import { FetchApi } from '../../api/Common';
import toast from 'react-hot-toast';

const ResponderConsulta = ({ consultaId, onRespuestaEnviada }) => {
  const [textoRespuesta, setTextoRespuesta] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('accessToken'); // Obtener el token

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await FetchApi({
        path: `api/consulta/${consultaId}/respuestas/crear`,
        method: 'POST',
        requiresAuth: true,
        payload: { textoRespuesta }, // Cuerpo de la solicitud
        token,
      });

      if (response.code === 201) {
        toast.success('Respuesta enviada correctamente');
        setTextoRespuesta('');
        if (onRespuestaEnviada) onRespuestaEnviada(); // Callback para actualizar el componente padre si es necesario
      } else if (response.code === 401) {
        toast.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        // Redirigir al usuario al login si es necesario
      } else {
        toast.error('Error al enviar la respuesta');
      }
    } catch (error) {
      console.error('Error detallado:', error);
      toast.error('Error al enviar la respuesta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Responder a la consulta</h3>
      <textarea
        value={textoRespuesta}
        onChange={(e) => setTextoRespuesta(e.target.value)}
        rows="4"
        className="block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 p-2"
        placeholder="Escribe tu respuesta..."
        required
      />
      <button
        type="submit"
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar Respuesta'}
      </button>
    </form>
  );
};

export default ResponderConsulta;
