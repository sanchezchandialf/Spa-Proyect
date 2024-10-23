import React, { useState, useEffect } from 'react';
import useAxios from '../../api/useAxios';
import { useAuth } from '../../context/AuthContext';
import { jsPDF } from "jspdf";
import toast from 'react-hot-toast';
import SpaFinal from '../../assets/SpaFinal.png';
export const TurnoCard = ({ turno }) => {
  const axiosInstance = useAxios();
  const [estadoTurno, setEstadoTurno] = useState(turno.estado);
  const [estadoPago, setEstadoPago] = useState(turno.pago);
  const [mostrarPagoModal, setMostrarPagoModal] = useState(false);
  const [numTarjeta, setNumTarjeta] = useState('');
  const [nombreTitular, setNombreTitular] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [codSeguridad, setCodSeguridad] = useState('');
  const [metodoPago, setMetodoPago] = useState('CREDITO');
  const [facturaUrl, setFacturaUrl] = useState(null);

  const { esCliente } = useAuth();

  useEffect(() => {
    setEstadoTurno(turno.estado);
    setEstadoPago(turno.pago);
    verificarYFinalizarTurno();
  }, [turno]);

  const esTurnoFinalizable = () => {
    if (estadoTurno === "CANCELADO" || estadoTurno === "FINALIZADO") return false;
    const currentDateTime = new Date();
    const turnoFechaHoraFin = new Date(`${turno.fecha}T${turno.horaFin}`);
    return turnoFechaHoraFin < currentDateTime;
  };

  const verificarYFinalizarTurno = async () => {
    if (esTurnoFinalizable()) {
      try {
        const response = await axiosInstance.post(`/api/turno/finalizarTurno/${turno.idTurno}`);
        if (response.status === 200) {
          setEstadoTurno("FINALIZADO");
          console.log("Turno finalizado automáticamente");
        }
      } catch (error) {
        console.error("Error al finalizar el turno automáticamente", error);
      }
    }
  };

  const handleCancelarTurno = async () => {
    try {
      const response = await axiosInstance.delete(`/api/turno/cancelar/${turno.idTurno}`);
      if (response.status === 200) {
        setEstadoTurno("CANCELADO");
        toast.success("Turno cancelado con éxito");
      } else {
        throw new Error('La respuesta del servidor no fue exitosa');
      }
    } catch (error) {
      console.error("Error al cancelar el turno", error);
      toast.error(error.response?.data?.message || "Error al cancelar el turno");
    }
  };

  const handlePagarTurno = () => {
    setMostrarPagoModal(true);
  };

  const handleCerrarPagoModal = () => {
    setMostrarPagoModal(false);
  };

  const handleProcesarPago = async (e) => {
    e.preventDefault();

    if (!numTarjeta || !nombreTitular || !vencimiento || !codSeguridad) {
      toast.error('Por favor complete todos los campos.');
      return;
    }

    const pagoData = {
      turnoId: turno.idTurno,
      numTarjeta,
      nombreTitular,
      vencimiento,
      codSeguridad,
      metodoPago
    };

    try {
      const response = await axiosInstance.post('/api/pago/procesar', pagoData);
      toast.success('Pago procesado exitosamente');
      setEstadoPago("COMPLETADO");
      handleCerrarPagoModal();
      generarYEnviarFacturaPDF(response.data.data);
    } catch (error) {
      console.error('Error al procesar el pago', error);
      toast.error(error.response?.data?.message || 'Error al procesar el pago');
    }
  };

  const generarYEnviarFacturaPDF = (detalles) => {
    const doc = new jsPDF('p', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.width;

    // Encabezado
    doc.setFontSize(18);
    doc.addImage(SpaFinal, 'PNG', 10, 10, 40, 40);
    doc.text('SPA SENTIRSE BIEN', pageWidth / 2, 40, { align: 'center' });
    doc.setFontSize(14);
    doc.text('FACTURA', pageWidth / 2, 70, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date(detalles.fechaPago).toLocaleDateString()}`, 40, 100);
    doc.text(`N° ${detalles.id.toString().padStart(4, '0')}`, pageWidth - 100, 100);

    // Línea separadora
    doc.line(40, 120, pageWidth - 40, 120);

    // Detalles del cliente
    doc.setFontSize(12);
    doc.text('Detalles del Cliente:', 40, 150);
    doc.setFontSize(10);
    doc.text(`Nombre: ${detalles.nombreTitular}`, 40, 170);
    doc.text(`Método de Pago: ${detalles.metodoPago}`, 40, 190);
    doc.text(`Turno ID: ${detalles.turno.idTurno}`, 40, 210);

    // Detalles del servicio
    doc.setFontSize(12);
    doc.text('Detalles del Turno:', 40, 240);
    doc.setFontSize(10);
    doc.text(`Fecha del Turno: ${detalles.turno.fecha}`, 40, 260);
    doc.text(`Hora del Turno: ${detalles.turno.horaInicio}`, 40, 280);
    doc.text(`Profesional: ${turno.profesional.usuario.nombre} ${turno.profesional.usuario.apellido}`, 40, 300);

    // Tabla de servicios
    const headers = [['Descripción', 'Importe']];
    const serviceData = detalles.turno.servicios.map(servicio => [
      servicio.detallesServicio,
      `$${servicio.precio.toFixed(2)}`
    ]);

    doc.autoTable({
      startY: 320,
      head: headers,
      body: serviceData,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 5 },
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 80, halign: 'right' }
      }
    });

    // Total
    const finalY = doc.lastAutoTable.finalY || 320;
    doc.setFontSize(12);
    doc.text(`Monto Total: $${detalles.monto.toFixed(2)}`, pageWidth - 120, finalY + 30, { align: 'right' });

    // Pie de página
    doc.setFontSize(8);
    doc.text('Gracias por su preferencia', pageWidth / 2, doc.internal.pageSize.height - 30, { align: 'center' });

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setFacturaUrl(pdfUrl);

    // Enviar la factura por correo
    const formData = new FormData();
    formData.append('factura', pdfBlob, 'factura.pdf');
    formData.append('turnoId', turno.idTurno.toString());

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
  };



  const abrirComprobante = () => {
    if (facturaUrl) {
      window.open(facturaUrl, '_blank');
    } else {
      toast.error('La factura aún no está disponible');
    }
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
        <span className={`ml-1 ${
          estadoTurno === "CANCELADO" ? "text-red-600" : 
          estadoTurno === "FINALIZADO" ? "text-blue-600" : 
          "text-green-600"
        }`}>
          {estadoTurno}
        </span>
      </p>

      {estadoTurno !== "FINALIZADO" && (
        <>
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
                onClick={abrirComprobante}
              >
                Comprobante
              </button>
            )}
          </div>

          {mostrarPagoModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Procesar Pago</h2>
                <form onSubmit={handleProcesarPago}>
                  <input
                    type="text"
                    placeholder="Número de Tarjeta"
                    value={numTarjeta}
                    onChange={(e) => setNumTarjeta(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Nombre del Titular"
                    value={nombreTitular}
                    onChange={(e) => setNombreTitular(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Vencimiento (MM/YY)"
                    value={vencimiento}
                    onChange={(e) => setVencimiento(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Código de Seguridad"
                    value={codSeguridad}
                    onChange={(e) => setCodSeguridad(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <select
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                  >
                    <option value="CREDITO">Crédito</option>
                    <option value="DEBITO">Débito</option>
                  </select>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleCerrarPagoModal}
                      className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Pagar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TurnoCard;
