import React, { useState, useEffect } from 'react';
import useAxios from '../../api/useAxios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import SpaFinal from '../../assets/SpaFinal.png'; 

const InformeIngresos = () => {
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [ingresos, setIngresos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useAxios();

  const fetchIngresos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/pago/ingresos?fechaInicio=${fechaInicio.toISOString().split('T')[0]}&fechaFin=${fechaFin.toISOString().split('T')[0]}`);
      setIngresos(response.data);
    } catch (err) {
      setError('Error al obtener los ingresos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngresos();
  }, [fechaInicio, fechaFin]);

  const generarInformePDF = () => {
    const doc = new jsPDF();

    // Agregar el logo
    doc.addImage(SpaFinal, 'PNG', 14, 10, 30, 30);

    // Título del informe
    doc.setFontSize(20);
    doc.setTextColor(52, 76, 61); // Color #344C3D
    doc.text('Informe de Ingresos', 50, 25);

    // Información del informe
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Fecha de inicio: ${fechaInicio.toISOString().split('T')[0]}`, 14, 50);
    doc.text(`Fecha de fin: ${fechaFin.toISOString().split('T')[0]}`, 14, 60);

    // Tabla de ingresos
    const columns = ["Tipo de Pago", "Monto Total"];
    const data = ingresos.map(ingreso => [ingreso[0], `$${ingreso[1].toFixed(2)}`]);

    doc.autoTable({
      startY: 70,
      head: [columns],
      body: data,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [130, 150, 114], textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [244, 243, 241] },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 60, halign: 'right' }
      }
    });

    // Pie de página
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(128);
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10, { align: 'right' });
    }

    window.open(URL.createObjectURL(doc.output('blob')), '_blank');
  };

  return (
    <div className="p-4 bg-[#f4f3f1]">
      <h2 className="text-2xl font-bold mb-4 text-[#344C3D]">Informe de Ingresos</h2>
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block mb-2 text-[#344C3D]">Fecha de inicio:</label>
          <DatePicker
            selected={fechaInicio}
            onChange={date => setFechaInicio(date)}
            className="border p-2 rounded bg-white text-[#344C3D]"
          />
        </div>
        <div>
          <label className="block mb-2 text-[#344C3D]">Fecha de fin:</label>
          <DatePicker
            selected={fechaFin}
            onChange={date => setFechaFin(date)}
            className="border p-2 rounded bg-white text-[#344C3D]"
          />
        </div>
        <button 
          onClick={generarInformePDF}
          className="bg-[#829672] text-white px-4 py-2 rounded hover:bg-[#344C3D] transition duration-300"
          disabled={ingresos.length === 0}
        >
          Imprimir y Generar PDF
        </button>
      </div>
      {loading && <p className="text-[#344C3D]">Cargando...</p>}
      {error && <p className="text-[#D8959B]">{error}</p>}
      {!loading && !error && (
        ingresos.length > 0 ? (
          <table className="w-full border-collapse border border-[#829672]">
            <thead>
              <tr className="bg-[#829672] text-white">
                <th className="border border-[#829672] p-2">Tipo de Pago</th>
                <th className="border border-[#829672] p-2">Monto Total</th>
              </tr>
            </thead>
            <tbody>
              {ingresos.map((ingreso, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f4f3f1]'}>
                  <td className="border border-[#829672] p-2 text-[#344C3D]">{ingreso[0]}</td>
                  <td className="border border-[#829672] p-2 text-[#344C3D]">${ingreso[1].toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg font-semibold text-[#344C3D]">No hay pagos registrados todavía.</p>
        )
      )}
    </div>
  );
};

export default InformeIngresos;
