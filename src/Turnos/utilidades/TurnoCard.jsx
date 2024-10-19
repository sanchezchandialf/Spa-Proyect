import React, { useState, useEffect } from 'react';
import useAxios from '../../api/useAxios';
import { useAuth } from '../../context/AuthContext';
import PagoModal from '../componentes/PagoModal';
import { jsPDF } from "jspdf";
import toast from 'react-hot-toast';

export const TurnoCard = ({ turno, onTurnoUpdated }) => {
  const axiosInstance = useAxios(); // Instancia de axios con autenticación
  const [estadoTurno, setEstadoTurno] = useState(turno.estado); // Estado local para manejar el estado del turno
  const [estadoPago, setEstadoPago] = useState(turno.pago);
  const [mostrarPagoModal, setMostrarPagoModal] = useState(false);

  const { esCliente } = useAuth();

  useEffect(() => {
    setEstadoTurno(turno.estado);
    setEstadoPago(turno.pago);
  }, [turno]);

  const esTurnoViejo = (turno) => {
    if (estadoTurno === "CANCELADO") return false;
    const currentDateTime = new Date();
    const turnoFechaHoraFin = new Date(`${turno.fecha}T${turno.horaFin}`);
    return turnoFechaHoraFin < currentDateTime;
  };

  const handleCancelarTurno = async () => {
    console.log("Intentando cancelar turno:", turno.idTurno);
    try {
      const response = await axiosInstance.delete(`/api/turno/cancelar/${turno.idTurno}`);
      console.log("Respuesta del servidor:", response);
      if (response.status === 200) {
        setEstadoTurno("CANCELADO");
        toast.success("Turno cancelado con éxito");
      } else {
        throw new Error('La respuesta del servidor no fue exitosa');
      }
    } catch (error) {
      console.error("Error al cancelar el turno", error);
      console.error("Detalles del error:", error.response);
      toast.error(error.response?.data?.message || "Error al cancelar el turno");
    }
  };

  const handlePagarTurno = () => {
    setMostrarPagoModal(true);
  };

  const handleCerrarPagoModal = () => {
    setMostrarPagoModal(false);
  };

  const handlePagoExitoso = (detallesPago) => {
    setEstadoPago("COMPLETADO");
    generarYEnviarFacturaPDF(detallesPago);
    if (onTurnoUpdated) {
      onTurnoUpdated(turno.idTurno, { ...turno, pago: "COMPLETADO" });
    }
  };

  const generarYEnviarFacturaPDF = (detalles) => {
    const doc = new jsPDF();

    // Generar el contenido del PDF
    doc.setFontSize(18);
    doc.text('Factura de Pago', 10, 10);

    doc.setFontSize(12);
    doc.text(`Número de Transacción: ${detalles.id}`, 10, 30);

    const fecha = new Date(detalles.fechaPago);
    const fechaFormateada = fecha.toLocaleString();
    doc.text(`Fecha de Pago: ${fechaFormateada}`, 10, 40);

    doc.text(`Fecha del Turno: ${detalles.turno.fecha}`, 10, 50);
    doc.text(`Hora del Turno: ${detalles.turno.horaInicio}`, 10, 60);
    doc.text(`Nombre del Titular: ${detalles.nombreTitular}`, 10, 70);
    doc.text(`Método de Pago: ${detalles.metodoPago}`, 10, 80);
    doc.text(`Turno ID: ${detalles.turno.idTurno}`, 10, 90);

    doc.text('Detalles de los Servicios:', 10, 100);
    detalles.turno.servicios.forEach((servicio, index) => {
      doc.text(`${index + 1}. ${servicio.detallesServicio} - ${servicio.precio} $`, 10, 110 + (index * 10));
    });

    doc.text(`Monto Total: ${detalles.monto} $`, 10, 120 + (detalles.turno.servicios.length * 10));

    // Convertir el PDF a Blob
    const pdfBlob = doc.output('blob');

    // Crear un objeto FormData
    const formData = new FormData();
    formData.append('factura', pdfBlob, 'factura.pdf');
    formData.append('turnoId', turno.idTurno);

    // Enviar la solicitud POST con axiosInstance
    toast.promise(
      axiosInstance.post('/api/pago/enviar-factura', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }),
      {
        loading: 'Enviando factura por correo...',
        success: 'Factura enviada por correo exitosamente',
        error: (err) => `Error al enviar la factura: ${err.response?.data?.message || 'Intente nuevamente'}`
      }
    ).catch(error => {
      console.error('Error al enviar la factura', error);
    });

    // Abrir el PDF en una nueva pestaña
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
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
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">
        Turno con {turno.profesional.usuario.nombre} {turno.profesional.usuario.apellido}
      </h3>
      <p className="text-sm text-gray-600">Fecha: {turno.fecha}</p>
      <p className="text-sm text-gray-600">Hora: {turno.horaInicio} - {turno.horaFin || 'Pendiente'}</p>
      
      <p className="text-sm text-gray-600 mt-2">
        Estado: 
        <span className={`ml-1 ${estadoTurno === "CANCELADO" ? "text-red-600" : "text-green-600"}`}>
          {estadoTurno}
        </span>
      </p>
      
      <p className="text-sm text-gray-600 mt-2">
        Pago: 
        <span className={`ml-1 ${estadoTurno === "PAGADO" || estadoPago === "COMPLETADO" ? "text-green-600" : "text-yellow-600"}`}>
          {estadoTurno === "PAGADO" || estadoPago === "COMPLETADO" ? "Pagado" : "Pendiente"}
        </span>
      </p>

      <div className="mt-3 flex space-x-2">
        {esCliente() && estadoTurno !== "CANCELADO" && estadoTurno !== "PAGADO" && estadoPago !== "COMPLETADO" && (
          <>
            <button
              className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
              onClick={handleCancelarTurno}
            >
              Cancelar
            </button>
            <button
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
              onClick={handlePagarTurno}
            >
              Pagar
            </button>
          </>
        )}
        {esCliente() && (estadoTurno === "PAGADO" || estadoPago === "COMPLETADO") && (
          <button
            className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600"
            onClick={generarComprobantePDF}
          >
            Comprobante
          </button>
        )}
      </div>

      {mostrarPagoModal && (
        <PagoModal
          turnoId={turno.idTurno}
          onClose={handleCerrarPagoModal}
          onPagoExitoso={handlePagoExitoso}
        />
      )}
    </div>
  );
};

export default TurnoCard;
