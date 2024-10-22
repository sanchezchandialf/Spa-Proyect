import React, { useEffect, useState, useRef } from 'react';
import { jsPDF } from 'jspdf';

const Factura = ({ id }) => {
  const [facturaData, setFacturaData] = useState(null);
  const facturaRef = useRef(); // Referencia al contenido de la factura

  // Simula la consulta a la base de datos para obtener los datos
  useEffect(() => {
    const fetchFacturaData = async () => {
      // Aquí reemplazarías con tu llamada real a la base de datos o API
      const response = await fetch(`/api/factura/${id}`);
      const data = await response.json();
      setFacturaData(data);
    };

    fetchFacturaData();
  }, [id]);

  // Función para generar el PDF
  const exportPDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4'); // Crear un nuevo documento PDF

    // Agregar el contenido del PDF manualmente
    doc.setFontSize(18);
    doc.text('Factura Comercial', 40, 40);
    doc.setFontSize(12);
    doc.text(`Spa Sentirse Bien`, 40, 60);
    doc.text(`Fecha: ${facturaData.fecha}`, 450, 40);
    doc.text(`Factura: #${facturaData.numeroFactura}`, 450, 60);

    // Detalles del cliente
    doc.setFontSize(14);
    doc.text('Detalles del Cliente:', 40, 100);
    doc.setFontSize(12);
    doc.text(`Nombre: ${facturaData.nombre}`, 40, 120);
    doc.text(`Email: ${facturaData.email}`, 40, 140);
    doc.text(`Teléfono: ${facturaData.telefono}`, 40, 160);

    // Detalles del servicio
    let yOffset = 200;
    doc.setFontSize(14);
    doc.text('Detalles del Servicio:', 40, yOffset);
    yOffset += 20;
    facturaData.servicios.forEach((servicio, index) => {
      doc.setFontSize(12);
      doc.text(`- ${servicio.descripcion} (Cantidad: ${servicio.cantidad}): $${servicio.valor.toFixed(2)}`, 40, yOffset);
      yOffset += 20;
    });

    // Total
    yOffset += 20;
    doc.setFontSize(14);
    doc.text(`Total: $${facturaData.total.toFixed(2)}`, 40, yOffset);

    // Footer
    yOffset += 40;
    doc.setFontSize(10);
    doc.text('Sitio Web: www.SpaSentirseBien.com', 40, yOffset);
    doc.text('Teléfono: (55) 1234-5678', 40, yOffset + 20);
    doc.text('Email: SpaSentirseBien@gmail.com', 40, yOffset + 40);
    doc.text('Dirección: Calle Cualquiera 123, Cualquier Lugar', 40, yOffset + 60);

    // Guardar el PDF con un nombre dinámico
    doc.save(`SpaSentirseBien${id}.pdf`);
  };

  if (!facturaData) {
    return <div>Cargando...</div>;
  }

  const { nombre, email, telefono, fecha, numeroFactura, servicios, total } = facturaData;

  return (
    <div ref={facturaRef} className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">FACTURA COMERCIAL</h2>
          <p className="text-sm">LICENCIADA JULIANA SILVA</p>
        </div>
        <div className="text-right">
          <p className="text-sm">Fecha: {fecha}</p>
          <p className="text-sm">Factura: #{numeroFactura}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="font-semibold">Nombre:</p>
          <p>{nombre}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{email}</p>
        </div>
        <div>
          <p className="font-semibold">Teléfono:</p>
          <p>{telefono}</p>
        </div>
      </div>

      <table className="w-full mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left p-2">Cantidad</th>
            <th className="text-left p-2">Servicios</th>
            <th className="text-right p-2">Valor</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{servicio.cantidad}</td>
              <td className="p-2">{servicio.descripcion}</td>
              <td className="p-2 text-right">${servicio.valor.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="text-right">
          <p className="font-semibold text-lg">Total: ${total.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>Sitio Web: www.sitioincreible.com</p>
        <p>Teléfono: (55) 1234-5678</p>
        <p>Email: hola@sitioincreible.com</p>
        <p>Dirección: Calle Cualquiera 123, Cualquier Lugar</p>
      </div>

      {/* Botón para exportar a PDF */}
      <div className="flex justify-end mt-6">
        <button
          onClick={exportPDF}
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-300"
        >
          Exportar a PDF
        </button>
      </div>
    </div>
  );
};

export default Factura;
