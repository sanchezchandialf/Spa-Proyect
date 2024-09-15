import React, { useState, useEffect } from 'react';
import { FetchApi } from '../../api/Common';
import {ServiceCard} from './ServiceCard';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Función para obtener los servicios desde la API
  const fetchServices = async () => {
    const response = await FetchApi({
      path: 'api/servicio/listar', // Asegúrate que este sea el path correcto
      method: 'GET',
    });

    if (response.code === 200 && response.data) {
      setServices(response.data);
      setFilteredServices(response.data); // Inicialmente, el filtro es todo el dataset
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) =>
        service.detallesServicio.toLowerCase().includes(query)
      );
      setFilteredServices(filtered);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Nuestros Servicios</h1>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Buscar servicios..."
        className="w-full mb-6 p-3 border border-gray-300 rounded-lg shadow-sm"
      />

      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No se encontraron servicios.</p>
      )}
    </div>
  );
};

export default ServicesSection;
