import React, { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';

const ListadoClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axios = useAxios();

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('api/cliente/listar');
      setClientes(response.data.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los clientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Listado de Clientes</h1>
      <button 
        onClick={fetchClientes}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Actualizar Lista
      </button>
      {clientes.length === 0 ? (
        <p>No hay clientes para mostrar.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Apellido</th>
              <th className="py-2 px-4 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.idCliente} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{cliente.nombre}</td>
                <td className="py-2 px-4 border-b">{cliente.apellido}</td>
                <td className="py-2 px-4 border-b">{cliente.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListadoClientes;