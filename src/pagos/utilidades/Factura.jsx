import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';

const Factura = ({ id }) => {
  const [facturaData, setFacturaData] = useState(null);

  // Simula la consulta a la base de datos para obtener los datos
  //useEffect(() => {
    // Aquí reemplazarías con tu llamada real a la base de datos o API
  //  const fetchFacturaData = async () => {
  //    const response = await fetch(`/api/factura/${id}`);
  //    const data = await response.json();
  //    setFacturaData(data);
  //  };

  //  fetchFacturaData();
  //}, [id]);

  //if (!facturaData) {
  //  return <div>Cargando...</div>;
  //}

  //const { nombre, email, telefono, fecha, numeroFactura, servicios, total } = facturaData;

  const nombre = "Juan Pérez";
  const email = "juan@example.com";
  const telefono = "555-1234";
  const fecha = "2023-01-01";
  const numeroFactura = "123456";
  const servicios = [
    { cantidad: 1, descripcion: "Servicio 1", valor: 100 },
    { cantidad: 2, descripcion: "Servicio 2", valor: 200 },
  ];    

  const total = servicios.reduce((acc, servicio) => acc + servicio.valor * servicio.cantidad, 0);

// Función para generar el PDF
 // Función para generar el PDF capturando el HTML con estilo
 const exportPDF = async () => {
    const facturaElement = facturaRef.current;

    // Usa html2canvas para capturar la factura como una imagen
    const canvas = await html2canvas(facturaElement, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // Crear el PDF y agregar la imagen
    const pdf = new jsPDF('p', 'pt', 'a4');
    const imgWidth = 595.28; // Ancho A4
    const pageHeight = 841.89; // Altura A4
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Agregar la imagen en páginas si es necesario
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Guardar el PDF con el nombre dinámico
    pdf.save(`SpaSentirseBien${id}.pdf`);
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
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
          onClick={exportPDF()}
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-300"
        >
          Exportar a PDF
        </button>
       </div>

    </div>

    
  );
};

export default Factura;
