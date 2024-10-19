import React, { useState } from 'react';
import useAxios from '../../api/useAxios';
import { useAuth } from '../../context/AuthContext';

export const TurnoCard = ({ turno }) => {
  const axiosInstance = useAxios(); // Instancia de axios con autenticación
  const [estadoTurno, setEstadoTurno] = useState(turno.estado); // Estado local para manejar el estado del turno

  const esTurnoViejo = (turno) => {
    if (estadoTurno === "CANCELADO") return false;
    const currentDateTime = new Date();
    const turnoFechaHoraFin = new Date(`${turno.fecha}T${turno.horaFin}`);
    return turnoFechaHoraFin < currentDateTime;
  };

  const { esCliente } = useAuth();

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
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">Turno con {turno.profesional.usuario.nombre} {turno.profesional.usuario.apellido}</h2>
      
      <p className="text-gray-600">Fecha: {turno.fecha}</p>
      <p className="text-gray-600">Hora inicio: {turno.horaInicio}</p>
      <p className="text-gray-600 mb-2">Hora fin: {turno.horaFin || 'Pendiente'}</p>

      <h3 className="font-semibold text-lg mb-2">Servicios a realizar:</h3>
      <ul className="list-disc pl-5 mb-2">
        {turno.servicios.map((servicio, index) => (
          <li key={index} className="text-gray-600">
            {servicio.categoria.nombre} - {servicio.detallesServicio}
          </li>
        ))}
      </ul>

      <p className="text-gray-600">Estado del turno: 
        {estadoTurno === "CANCELADO" ? (
          <span className="ml-2 text-red-600">Cancelado</span>
        ) : esTurnoViejo(turno) ? (
          <span className="ml-2 text-yellow-600">Finalizado</span>
        ) : (
          <span className="ml-2 text-green-600">Asignado</span>
        )}
      </p>

      <p className="text-gray-600">Estado del pago: 
        {turno.pago === null ? (
          <span className="ml-2 text-red-600">Pendiente</span>
        ) : (
          <span className="ml-2 text-green-600">Completado</span>
        )}
      </p>

      {!esCliente() && (
        <p className="text-gray-600">Teléfono del cliente: {turno.cliente.telefono}</p>
      )}

      {estadoTurno !== "CANCELADO" && !esTurnoViejo(turno) && (
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleCancelarTurno}
        >
          Cancelar turno
        </button>
      )}
    </div>
  );
};

export default TurnoCard;
