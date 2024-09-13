import React from 'react';
import { useForm } from 'react-hook-form';
import { FetchApi } from '../../api/Common';
import toast from 'react-hot-toast';

/**
 * ComentarioForm
 *
 * Formulario para que los usuarios puedan enviar sus comentarios sobre
 * el sitio web.
 *
 * @returns {JSX.Element} Un JSX.Element que representa el formulario.
 */

const ComentarioForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(); // Inicializamos el hook de formulario

  const onSubmit = async (data) => {
    try {
      // Usamos destructuración para obtener los valores de data
      const { nombre, comentario } = data;
      console.log(data);
      const response = await FetchApi({
        path: 'api/comentario/crear',
        method: 'POST',
        payload: {
          nombrePersona: nombre,
          textoComentario: comentario,
        },
      });

      if (response.code === 201) {
        toast.success('Comentario enviado correctamente');
        reset(); // Reseteamos los campos después de un envío exitoso
      } else {
        toast.error('Error al enviar el comentario');
      }
    } catch (error) {
      toast.error('Ocurrió un error inesperado');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Déjanos tu Comentario</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-lg font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            {...register('nombre', { required: 'El nombre es obligatorio' })} // Registro con validación
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="comentario" className="block text-lg font-medium text-gray-700 mb-1">
            Comentario
          </label>
          <textarea
            id="comentario"
            {...register('comentario', { required: 'El comentario es obligatorio' })} // Registro con validación
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.comentario && (
            <p className="text-red-500 text-sm mt-1">{errors.comentario.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-[#212121] text-white font-semibold text-lg rounded-lg border border-[#bfbfbf] hover:bg-[#333333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#212121] transition duration-300"
        >
          Enviar Comentario
        </button>
      </form>
    </div>
  );
};

export default ComentarioForm;
