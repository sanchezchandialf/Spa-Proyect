import React, { useState } from 'react';
import useAxios from '../../api/useAxios';
import { useAuth } from '../../context/AuthContext';

export const TurnoCard = ({ turno }) => {
  const axiosInstance = useAxios(); // Instancia de axios con autenticación
  const [estadoTurno, setEstadoTurno] = useState(turno.estado); // Estado local para manejar el estado del turno

  const esTurnoViejo = (turno) => {
    if(estadoTurno === "CANCELADO") return false;
    const currentDateTime = new Date();
    const turnoFechaHoraFin = new Date(turno.fecha);
    return turnoFechaHoraFin < currentDateTime;
  };

  const {esCliente}= useAuth();

  const handleCancelarTurno = async () => {
    try {
      const response = await axiosInstance.delete(`/api/turno/cancelar/${turno.idTurno}`);
      if (response.status === 200) {
        setEstadoTurno("CANCELADO"); // Actualizar el estado local si la cancelación es exitosa
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error al cancelar el turno", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 ">
      <h2 className="text-xl font-bold mb-2">{turno.servicio.categoria.nombre}</h2>
      <p className="text-gray-600">Detalles del servicio: {turno.servicio.detallesServicio}</p>
      {!esCliente() && <p className="text-gray-600">Teléfono del cliente: {turno.cliente.telefono}</p>}
      <p className="text-gray-600">Fecha: {turno.fecha}</p>
      <p className="text-gray-600 mb-2">Hora inicio: {turno.horaInicio} </p>

      {estadoTurno === "CANCELADO" ? (
        <span className="inline-block  py-1 bg-red-200 text-red-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
          Cancelado
        </span>
      ) : esTurnoViejo(turno) ? (
        <span className="inline-block py-1 bg-yellow-200 text-yellow-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
          Finalizado
        </span>
      ) : (
        <>
          <span className="inline-block py-1 bg-green-200 text-green-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
            Asignado
          </span>
          <button
            className="mt-4 ml-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            onClick={handleCancelarTurno}
          >
            Cancelar turno
          </button>
        </>
      )}
    </div>
  );
};

export default TurnoCard