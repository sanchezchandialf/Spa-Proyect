import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from '../../api/useAxios';

const ConsultasList = ({ onConsultaSelect }) => {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const axiosInstance = useAxios();

  const fetchConsultas = async (contestado = '') => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/consulta/listar`, {
        params: { contestado }
      });

      if (response.status === 200) {
        setConsultas(response.data);
      } else {
        toast.error('Error al obtener las consultas');
      }
    } catch (error) {
      console.error('Error detallado:', error);
      toast.error('Error al obtener las consultas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultas(filter);
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-48 text-gray-600">Cargando consultas...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Consultas</h2>
      <div className="mb-6">
        <label htmlFor="filter" className="block mb-2 text-gray-700 font-semibold">
          Filtrar Consultas:
        </label>
        <select
          onChange={handleFilterChange}
          value={filter}
          id="filter"
          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
        >
          <option value="">Todas</option>
          <option value="true">Consultas Contestadas</option>
          <option value="false">Consultas Sin Contestar</option>
        </select>
      </div>

      {consultas.length === 0 ? (
        <p className="text-gray-600 text-center">No hay consultas disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {consultas.map((consulta) => (
            <li
              key={consulta.id} // Asegúrate de que cada consulta tenga un id único
              onClick={() => onConsultaSelect(consulta)}
              className="p-4 bg-gray-50 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition ease-in-out"
            >
              <h3 className="font-semibold text-lg text-gray-800">{consulta.temaConsulta}</h3>
              <p className="text-sm text-gray-600">{consulta.nombrePersona}</p>
              <p className="text-sm text-gray-600">{consulta.email}</p>
              <p className="text-sm text-gray-600">
                <strong className="font-medium">Estado:</strong> {consulta.contestado ? 'Contestada' : 'Sin contestar'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConsultasList;
