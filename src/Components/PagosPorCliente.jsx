// src/components/PagosPorCliente.jsx

import React, { useState } from 'react';
import useAxios from '../api/useAxios';
import { jsPDF } from "jspdf";
import toast from 'react-hot-toast';

const PagosPorCliente = () => {
  const [clienteId, setClienteId] = useState('');
  const [pagos, setPagos] = useState([]);
  const [error, setError] = useState('');
  const [facturaUrl, setFacturaUrl] = useState(null);
  const api = useAxios();

  const handleInputChange = (e) => {
    setClienteId(e.target.value);
  };

  const fetchPagos = async () => {
    if (!clienteId || isNaN(clienteId)) {
      setError('Por favor, ingresa un ID de cliente válido.');
      return;
    }

    try {
      const response = await api.get(`/api/pago/cliente/${clienteId}`);
      setPagos(response.data.data);
      setError('');  // Limpiar errores si la solicitud es exitosa.
    } catch (error) {
      setError('Error al obtener los pagos del cliente.');
    }
  };

  const generarInformePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Informe de Pagos por Cliente', 10, 10);

    doc.setFontSize(12);
    doc.text(`ID del Cliente: ${clienteId}`, 10, 20);

    let yPos = 30;
    pagos.forEach((pago, index) => {
      doc.text(`Pago ${index + 1}:`, 10, yPos);
      yPos += 10;
      doc.text(`Nombre del Cliente: ${pago.turno.cliente.usuario.nombre} ${pago.turno.cliente.usuario.apellido}`, 15, yPos);
      yPos += 10;
      doc.text(`Titular de la Tarjeta: ${pago.nombreTitular}`, 15, yPos);
      yPos += 10;
      doc.text(`Monto Total: $${pago.monto.toFixed(2)}`, 15, yPos);
      yPos += 10;
      doc.text(`Fecha del Pago: ${new Date(pago.fechaPago).toLocaleDateString()}`, 15, yPos);
      yPos += 10;
      doc.text(`Fecha del Turno: ${new Date(pago.turno.fecha).toLocaleDateString()}`, 15, yPos);
      yPos += 10;
      doc.text(`Hora del Turno: ${pago.turno.horaInicio}`, 15, yPos);
      yPos += 20;

      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
    });

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setFacturaUrl(pdfUrl);
    
    toast.success('Informe PDF generado con éxito');
  };

  const abrirInforme = () => {
    if (facturaUrl) {
      window.open(facturaUrl, '_blank');
    } else {
      toast.error('El informe aún no está disponible');
    }
  };

  return (
    <div className="p-6 bg-[#F0E6E6] min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-[#2C4421]">Pagos por Cliente</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Ingresa el ID del cliente"
          value={clienteId}
          onChange={handleInputChange}
          className="p-2 border-2 border-[#4A6340] rounded-md"
        />
        <button
          onClick={fetchPagos}
          className="ml-4 p-2 bg-[#4A6340] text-white rounded-md hover:bg-[#3A4F32] transition-colors"
        >
          Buscar Pagos
        </button>
      </div>

      {error && <p className="text-red-700 font-semibold">{error}</p>}

      <div className="w-full max-w-5xl mt-6 overflow-x-auto">
        <table className="w-full table-auto border-collapse shadow-lg">
          <thead className="bg-[#4A6340] text-white">
            <tr>
              <th className="px-4 py-3">Nombre del Cliente</th>
              <th className="px-4 py-3">Titular de la Tarjeta</th>
              <th className="px-4 py-3">Monto Total</th>
              <th className="px-4 py-3">Fecha del Pago</th>
              <th className="px-4 py-3">Fecha del Turno</th>
              <th className="px-4 py-3">Hora del Turno</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {pagos.map((pago) => (
              <tr key={pago.id} className="border-b border-[#E0D8D8] hover:bg-[#F5F0F0] transition-colors">
                <td className="px-4 py-3 text-center">
                  {pago.turno.cliente.usuario.nombre} {pago.turno.cliente.usuario.apellido}
                </td>
                <td className="px-4 py-3 text-center">{pago.nombreTitular}</td>
                <td className="px-4 py-3 text-center font-semibold">${pago.monto.toFixed(2)}</td>
                <td className="px-4 py-3 text-center">
                  {new Date(pago.fechaPago).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center">
                  {new Date(pago.turno.fecha).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center">
                  {pago.turno.horaInicio}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagos.length > 0 && (
        <div className="mt-4">
          <button
            onClick={generarInformePDF}
            className="p-2 bg-[#4A6340] text-white rounded-md hover:bg-[#3A4F32] transition-colors mr-2"
          >
            Generar Informe PDF
          </button>
          <button
            onClick={abrirInforme}
            className="p-2 bg-[#4A6340] text-white rounded-md hover:bg-[#3A4F32] transition-colors"
          >
            Abrir Informe PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default PagosPorCliente;
