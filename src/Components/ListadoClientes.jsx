import React, { useEffect, useState, useCallback } from 'react';
import { FetchApi } from '../api/Common';

const ListadoClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClientes = useCallback(async () => {
    try {
      setLoading(true);
      const { code, data, message } = await FetchApi({
        path: 'api/cliente/listar',
        method: 'GET',
        requiresAuth: true,
        token: localStorage.getItem('token')
      });
      
      if (code === 200) {
        setClientes(data || []);
        setError(null);
      } else {
        throw new Error(message || "Error desconocido al obtener los clientes");
      }
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      setError('Hubo un problema al cargar los clientes. Inténtalo de nuevo.');
      setClientes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  // Función para actualizar la lista de clientes
  const actualizarListaClientes = () => {
    fetchClientes();
  };

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Listado de Clientes</h1>
      <button 
        onClick={actualizarListaClientes}
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
                <td className="py-2 px-4 border-b">{cliente.usuario?.nombre || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{cliente.usuario?.apellido || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{cliente.usuario?.email || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListadoClientes;
