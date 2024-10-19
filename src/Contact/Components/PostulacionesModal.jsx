import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';

const PostulacionModal = ({ empleo, onClose }) => {
  const [cvFile, setCvFile] = useState(null);
  const axiosInstance = useAxios();

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cvFile) {
      alert('Por favor, selecciona un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('cv', cvFile);
    formData.append('id_empleo', empleo.idEmpleo);

    try {
      await axiosInstance.post(
        '/api/postulacion/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Postulación realizada con éxito');
      onClose();
    } catch (error) {
      console.error('Error al enviar la postulación', error);
      alert('Error al enviar la postulación');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Postularse para {empleo.titulo}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Selecciona tu CV (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostulacionModal;
