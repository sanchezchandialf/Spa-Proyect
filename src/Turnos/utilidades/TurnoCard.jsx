import React, { useState } from 'react';
import useAxios from '../../api/useAxios';
import { useAuth } from '../../context/AuthContext';
import PagoModal from '../componentes/PagoModal';
import { jsPDF } from "jspdf";

export const TurnoCard = ({ turno }) => {
  const axiosInstance = useAxios(); // Instancia de axios con autenticación
  const [estadoTurno, setEstadoTurno] = useState(turno.estado); // Estado local para manejar el estado del turno
  const [estadoPago, setEstadoPago] = useState(turno.pago);
  const [mostrarPagoModal, setMostrarPagoModal] = useState(false);

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

  const handlePagarTurno = () => {
    setMostrarPagoModal(true);
  };

  const handleCerrarPagoModal = () => {
    setMostrarPagoModal(false);
  };

  const handlePagoExitoso = () => {
    setEstadoPago("COMPLETADO");
  };

  const generarComprobantePDF = () => {
    const doc = new jsPDF();
    doc.text("Comprobante de Pago", 10, 10);
    doc.text(`Turno ID: ${turno.idTurno}`, 10, 20);
    doc.text(`Profesional: ${turno.profesional.usuario.nombre} ${turno.profesional.usuario.apellido}`, 10, 30);
    doc.text(`Fecha: ${turno.fecha}`, 10, 40);
    doc.text(`Hora: ${turno.horaInicio} - ${turno.horaFin}`, 10, 50);
    doc.text(`Estado del pago: ${estadoPago === "COMPLETADO" ? "Pagado" : "Pendiente"}`, 10, 60);
    
    // Generar el PDF y abrirlo en una nueva pestaña
    window.open(doc.output('bloburl'), '_blank');
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
        {estadoPago === null ? (
          <span className="ml-2 text-red-600">Pendiente</span>
        ) : (
          <span className="ml-2 text-green-600">Completado</span>
        )}
      </p>

      {!esCliente() && (
        <p className="text-gray-600">Teléfono del cliente: {turno.cliente.telefono}</p>
      )}

      <div className="mt-4 flex space-x-2">
        {estadoTurno !== "CANCELADO" && !esTurnoViejo(turno) && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleCancelarTurno}
          >
            Cancelar turno
          </button>
        )}

        {estadoPago === null && !esTurnoViejo(turno) && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handlePagarTurno}
          >
            Pagar turno
          </button>
        )}

        {estadoPago === "COMPLETADO" && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={generarComprobantePDF}
          >
            Imprimir Comprobante
          </button>
        )}
      </div>

      {mostrarPagoModal && (
        <PagoModal
          turnoId={turno.idTurno}
          onClose={() => setMostrarPagoModal(false)}
          onPagoExitoso={handlePagoExitoso}
        />
      )}
    </div>
  );
};

export default TurnoCard;
