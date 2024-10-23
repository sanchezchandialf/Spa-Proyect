import React, { useState, useEffect } from 'react';
import useAxios from '../api/useAxios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import SpaFinal from '../assets/SpaFinal.png';

const InformeServicios = () => {
  const [profesionales, setProfesionales] = useState([]);
  const [idProfesional, setIdProfesional] = useState('');
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useAxios();

  const formatoFecha = "dd-MM-yyyy";

  // Obtener listado de profesionales
  const fetchProfesionales = async () => {
    try {
      const response = await api.get('/api/profesional/listar');
      setProfesionales(response.data.data);
    } catch (err) {
      console.error('Error al obtener los profesionales', err);
    }
  };

  // Obtener servicios por profesional y rango de fechas
  const fetchServicios = async () => {
    if (!idProfesional) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/turno/profesional/servicios?idProfesional=${idProfesional}&fechaInicio=${fechaInicio.toISOString().split('T')[0]}&fechaFin=${fechaFin.toISOString().split('T')[0]}`);
      setServicios(response.data.data);
    } catch (err) {
      setError('Error al obtener los servicios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generarInformePDF = () => {
    const doc = new jsPDF();

    // Agregar el logo
    doc.addImage(SpaFinal, 'PNG', 14, 10, 30, 30);

    // Título del informe
    doc.setFontSize(20);
    doc.setTextColor(52, 76, 61); // Color #344C3D
    doc.text('Informe de Servicios Realizados', 50, 25);

    // Información del informe
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const profesionalSeleccionado = profesionales.find(p => p.idProfesional === idProfesional);
    doc.text(`Profesional: ${profesionalSeleccionado ? `${profesionalSeleccionado.usuario.nombre} ${profesionalSeleccionado.usuario.apellido}` : 'No seleccionado'}`, 14, 50);
    doc.text(`Fecha de inicio: ${fechaInicio.toISOString().split('T')[0]}`, 14, 60);
    doc.text(`Fecha de fin: ${fechaFin.toISOString().split('T')[0]}`, 14, 70);

    // Tabla de servicios
    const columns = ["Nombre del Servicio", "Fecha de Realización"];
    const data = servicios.map(servicio => [servicio.nombreServicio, servicio.fechaRealizacion]);

    doc.autoTable({
      startY: 80,
      head: [columns],
      body: data,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [130, 150, 114], textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [244, 243, 241] },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 60 }
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

  useEffect(() => {
    fetchProfesionales();
  }, []);

  return (
    <div className="p-4 bg-[#f4f3f1]">
      <h2 className="text-2xl font-bold mb-4 text-[#344C3D]">Servicios Realizados por Profesional</h2>

      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block mb-2 text-[#344C3D]">Seleccionar Profesional:</label>
          <select
            value={idProfesional}
            onChange={(e) => setIdProfesional(e.target.value)}
            className="border p-2 rounded bg-white text-[#344C3D]"
          >
            <option value="">Seleccionar</option>
            {profesionales.map((profesional) => (
              <option key={profesional.idProfesional} value={profesional.idProfesional}>
                {`${profesional.usuario.nombre} ${profesional.usuario.apellido}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-[#344C3D]">Fecha de Inicio:</label>
          <DatePicker
            selected={fechaInicio}
            onChange={(date) => setFechaInicio(date)}
            dateFormat={formatoFecha}
            className="border p-2 rounded bg-white text-[#344C3D]"
          />
        </div>

        <div>
          <label className="block mb-2 text-[#344C3D]">Fecha de Fin:</label>
          <DatePicker
            selected={fechaFin}
            onChange={(date) => setFechaFin(date)}
            dateFormat={formatoFecha}
            className="border p-2 rounded bg-white text-[#344C3D]"
          />
        </div>

        <button
          onClick={fetchServicios}
          className="bg-[#829672] text-white px-4 py-2 rounded hover:bg-[#344C3D] transition duration-300"
        >
          Buscar
        </button>

        <button
          onClick={generarInformePDF}
          className="bg-[#829672] text-white px-4 py-2 rounded hover:bg-[#344C3D] transition duration-300"
          disabled={servicios.length === 0}
        >
          Imprimir y Generar PDF
        </button>
      </div>

      {loading && <p className="text-[#344C3D]">Cargando...</p>}
      {error && <p className="text-lg font-semibold text-[#344C3D]">No hay servicios registrados en este rango de fechas.</p>}
      {!loading && servicios.length > 0 && !error && (
        <table className="w-full border-collapse border border-[#829672]">
            <thead>
              <tr className="bg-[#829672] text-white">
                <th className="border border-[#829672] p-2">Nombre del Servicio</th>
                <th className="border border-[#829672] p-2">Fecha de Realización</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f4f3f1]'}>
                  <td className="border border-[#829672] p-2 text-[#344C3D]">{servicio.nombreServicio}</td>
                  <td className="border border-[#829672] p-2 text-[#344C3D]">{servicio.fechaRealizacion}</td>
                </tr>
              ))}
            </tbody>
        </table>
      )}
    </div>
  );
};

export default InformeServicios;
