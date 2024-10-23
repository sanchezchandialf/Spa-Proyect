import React, { useState, useEffect } from 'react';
import useAxios from '../api/useAxios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const ClientesPorProfesional = () => {
  const [turnos, setTurnos] = useState([]);
  const [fecha, setFecha] = useState(new Date());
  const [idProfesional, setIdProfesional] = useState('');
  const [pagado, setPagado] = useState(false);
  const [profesionales, setProfesionales] = useState([]);
  const [error, setError] = useState('');
  const axios = useAxios();

  useEffect(() => {
    const fetchProfesionales = async () => {
      try {
        const response = await axios.get('/api/profesional/listar');
        setProfesionales(response.data.data);
      } catch (error) {
        console.error('Error al obtener los profesionales:', error);
      }
    };

    fetchProfesionales();
  }, []);

  useEffect(() => {
    const fetchTurnos = async () => {
      if (!idProfesional) return;
      
      try {
        const fechaFormateada = fecha.toISOString().split('T')[0];
        const response = await axios.get(`/api/turno/asignados/por-profesional`, {
          params: {
            idProfesional,
            fecha: fechaFormateada,
            pagado
          }
        });
        if (response.data && Array.isArray(response.data.data)) {
          setTurnos(response.data.data);
          setError('');
        } else {
          console.error('La respuesta no tiene el formato esperado:', response.data);
          setTurnos([]);
          setError('No hay clientes con turno en esta fecha');
        }
      } catch (error) {
        console.error('Error al obtener los turnos:', error);
        setTurnos([]);
        if (error.response && error.response.status === 404) {
          setError('No hay clientes con turno en esta fecha');
        } else {
          setError('Error al obtener los turnos');
        }
      }
    };

    fetchTurnos();
  }, [idProfesional, fecha, pagado]);

  const generarInformePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Informe de Clientes por Profesional', 14, 20);

    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha.toISOString().split('T')[0]}`, 14, 30);
    doc.text(`Profesional: ${profesionales.find(p => p.idProfesional === idProfesional)?.usuario.nombre || 'No seleccionado'}`, 14, 40);
    doc.text(`Estado de pago: ${pagado ? 'Pagado' : 'No pagado'}`, 14, 50);

    const columns = [
      "Cliente", "DNI", "Teléfono", "Fecha", "Hora"
    ];

    const data = turnos.map(turno => [
      `${turno.cliente.usuario.nombre} ${turno.cliente.usuario.apellido}`,
      turno.cliente.usuario.dni,
      turno.cliente.telefono,
      turno.fecha,
      `${turno.horaInicio} - ${turno.horaFin}`
    ]);

    doc.autoTable({
      startY: 60,
      head: [columns],
      body: data,
      theme: 'striped',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [242, 225, 244], textColor: [0, 0, 0], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 240, 249] },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 40 }
      }
    });

    window.open(URL.createObjectURL(doc.output('blob')), '_blank');
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Clientes por profesional</h1>
      <div className="mb-4 flex space-x-4">
        <select
          value={idProfesional}
          onChange={(e) => setIdProfesional(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Seleccionar Profesional</option>
          {profesionales.map((profesional) => (
            <option key={profesional.idProfesional} value={profesional.idProfesional}>
              {`${profesional.usuario.nombre} ${profesional.usuario.apellido}`}
            </option>
          ))}
        </select>
        <DatePicker
          selected={fecha}
          onChange={(date) => setFecha(date)}
          className="border p-2 rounded"
        />
        <select
          value={pagado ? 'pagado' : 'no_pagado'}
          onChange={(e) => setPagado(e.target.value === 'pagado')}
          className="border p-2 rounded"
        >
          <option value="no_pagado">No pagado</option>
          <option value="pagado">Pagado</option>
        </select>
        <button
          onClick={generarInformePDF}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          disabled={turnos.length === 0}
        >
          Imprimir y Generar PDF
        </button>
      </div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Cliente</th>
              <th className="py-2 px-4 border-b">DNI</th>
              <th className="py-2 px-4 border-b">Teléfono</th>
              <th className="py-2 px-4 border-b">Fecha</th>
              <th className="py-2 px-4 border-b">Hora</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((turno) => (
              <tr key={turno.idTurno} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{`${turno.cliente.usuario.nombre} ${turno.cliente.usuario.apellido}`}</td>
                <td className="py-2 px-4 border-b">{turno.cliente.usuario.dni}</td>
                <td className="py-2 px-4 border-b">{turno.cliente.telefono}</td>
                <td className="py-2 px-4 border-b">{turno.fecha}</td>
                <td className="py-2 px-4 border-b">{`${turno.horaInicio} - ${turno.horaFin}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientesPorProfesional;
