import React, { useState } from 'react';
import useAxios from '../../api/useAxios';
import { useAuth } from '../../context/AuthContext';
import { TurnoCard } from '../utilidades/TurnoCard';

const ConsultarTurnosSection = () => {
    const [turnos, setTurnos] = useState([]);
    const axiosInstance = useAxios();
    const { esProfesional } = useAuth();
    const [selectedDate, setSelectedDate] = useState('');
  
    // Función para obtener los turnos desde la API
    const fetchTurnos = async (endpoint) => {
      try {
        const response = await axiosInstance.get(endpoint);
        if (response.status === 200 && response.data) {
          // Asegurarse de acceder correctamente a los datos
          setTurnos(response.data.data || []); // Usa response.data.data para acceder al array de turnos
        } else {
          console.error('Error al obtener los turnos:', response);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
    
    // Manejar la selección de la fecha
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

    const fetchTurnosPorFecha = () => {
        if (selectedDate) {
          fetchTurnos(`/api/turno/por-fecha?fecha=${selectedDate}`);
        } else {
          console.error('Por favor, selecciona una fecha válida.');
        }
      };
  
    if (!esProfesional) {
      return <p>No tienes acceso a esta sección.</p>;
    }
  
    return (
      <div className="container mx-2 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black ">Gestión de Turnos</h1>
        <div className="mb-6 flex flex-wrap gap-4">
        {/* Selector de fecha */}
        <span className="flex items-center gap-1 ">
            <div>
            <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="p-2 border border-gray-300 rounded"
            /> 
            
            <button
            onClick={fetchTurnosPorFecha}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
            >
            Buscar Turnos por Fecha
            </button>  
            </div>
            
        </span>
        {/* Botones para las diferentes consultas */}
        
          
          <button
            onClick={() => fetchTurnos('/api/turno/listar')}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            Listar Todos los Turnos
          </button>
          <button
            onClick={() => fetchTurnos('/api/turno/listar?estado=asignado')}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            Turnos Asignados
          </button>
          <button
            onClick={() => fetchTurnos('/api/turno/listar?estado=cancelado')}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            Turnos Cancelados
          </button>
          
        </div>
  
        {/* Mostrar los turnos */}
        {turnos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#f2e1f4] p-6 border-pink-900 border-4">
            {turnos.map((turno) => (
              <TurnoCard key={turno.idTurno} turno={turno} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No se encontraron turnos.</p>
        )}
      </div>
    );
  };
  
  export default ConsultarTurnosSection;