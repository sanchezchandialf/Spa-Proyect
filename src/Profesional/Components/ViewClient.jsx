import { useState, useEffect } from "react";
import  useAxios  from "../../hooks/useAxios"; // Asegúrate de que este hook esté disponible o reemplázalo con Axios directo

export const ViewClient = () => {
  const axiosInstance = useAxios(); // Hook para manejar Axios, puedes usar `axios.create` si no tienes este hook
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState([]);

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/cliente/listar'); // Cambié la URL para clientes
      setClientes(response.data.data); // Supongo que los datos de clientes están en response.data.data
    } catch (error) {
      console.error('Error al obtener los clientes', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes(); // Se ejecuta una vez cuando el componente se monta
  }, []);

  return (
    <section>
      <div>Lista de Clientes</div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul className="space-y-4">
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <li
                key={cliente.idCliente}
                className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {cliente.nombre}
                </h3>
                <p className="text-sm text-gray-600">{cliente.apellido}</p>
              </li>
            ))
          ) : (
            <p>No hay clientes disponibles</p>
          )}
        </ul>
      )}
    </section>
  );
};
