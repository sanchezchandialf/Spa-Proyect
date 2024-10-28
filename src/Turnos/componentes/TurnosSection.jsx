import React, { useState } from 'react';
import useAxios from '../../api/useAxios';
import { useAuth } from '../../context/AuthContext';
import { TurnoCard } from '../utilidades/TurnoCard';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const ConsultarTurnosSection = () => {
    const [turnos, setTurnos] = useState([]);
    const axiosInstance = useAxios();
    const { esProfesional } = useAuth();
    const [selectedDate, setSelectedDate] = useState('');
  
    // Función para obtener los turnos desde la API
    const fetchTurnos = async (endpoint) => {
      try {
        const response = await axiosInstance.get(endpoint);
        if (response.status === 200 && response.data) {
          // Asegurarse de acceder correctamente a los datos
          setTurnos(response.data.data || []); // Usa response.data.data para acceder al array de turnos
        } else {
          console.error('Error al obtener los turnos:', response);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
    
    // Manejar la selección de la fecha
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

    const fetchTurnosPorFecha = () => {
        if (selectedDate) {
          fetchTurnos(`/api/turno/por-fecha?fecha=${selectedDate}`);
        } else {
          console.error('Por favor, selecciona una fecha válida.');
        }
      };
  
    const generarInformePDF = () => {
      const doc = new jsPDF();
  
      doc.setFontSize(18);
      doc.text('Informe de Turnos', 14, 20);
  
      doc.setFontSize(12);
      doc.text(`Fecha: ${selectedDate || 'Todos los turnos'}`, 14, 30);
  
      const columns = [
        "Profesional", "Fecha", "Hora", "Estado", "Pago"
      ];
  
      const data = turnos.map(turno => [
        `${turno.profesional.usuario.nombre} ${turno.profesional.usuario.apellido}`,
        turno.fecha,
        `${turno.horaInicio} - ${turno.horaFin || 'Pendiente'}`,
        turno.estado,
        turno.pago === "COMPLETADO" || turno.estado === "PAGADO" ? "Pagado" : "Pendiente"
      ]);
  
      doc.autoTable({
        startY: 40,
        head: [columns],
        body: data,
        theme: 'striped',
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [242, 225, 244], textColor: [0, 0, 0], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [248, 240, 249] },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 30 },
          2: { cellWidth: 40 },
          3: { cellWidth: 30 },
          4: { cellWidth: 30 }
        }
      });
  
      // Abrir el PDF en una nueva ventana para imprimir
      window.open(URL.createObjectURL(doc.output('blob')), '_blank');
    };
  
    if (!esProfesional) {
      return <p>No tienes acceso a esta sección.</p>;
    }
  
    const turnosPagados = turnos.filter(turno => turno.pago === "COMPLETADO" || turno.estado === "PAGADO");
    const turnosPendientes = turnos.filter(turno => turno.pago !== "COMPLETADO" && turno.estado !== "PAGADO");
  
    return (
      <div className="container mx-2 p-6 bg-[#f2e1f4]">
        <h1 className="text-3xl font-bold mb-6 text-center text-black ">Gestión de Turnos</h1>
        <div className="mb-6 flex flex-wrap gap-4">
        {/* Selector de fecha */}
        <span className="flex items-center gap-1 ">
            <div>
            <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="p-2 border border-gray-300 rounded"
            /> 
            
            <button
            onClick={fetchTurnosPorFecha}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
            >
            Buscar Turnos por Fecha
            </button>  
            </div>
            
        </span>
        {/* Botones para las diferentes consultas */}
        
          
          <button
            onClick={() => fetchTurnos('/api/turno/listar')}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            Listar Todos los Turnos
          </button>
         {/*  <button
            onClick={() => fetchTurnos('/api/turno/listar?estado=asignado')}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            Turnos Asignados
          </button>
          <button
            onClick={() => fetchTurnos('/api/turno/listar?estado=cancelado')}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            Turnos Cancelados
          </button> */}
          <button
            onClick={generarInformePDF}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Imprimir y Generar PDF
          </button>
        </div>
  
        {/* Mostrar los turnos */}
        {turnos.length > 0 ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Turnos Pendientes de Pago</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#f2e1f4] p-6 border-pink-900 border-4 mb-6">
              {turnosPendientes.map((turno) => (
                <TurnoCard key={turno.idTurno} turno={turno} />
              ))}
            </div>

            <h2 className="text-2xl font-semibold mb-4">Turnos Pagados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#f2e1f4] p-6 border-pink-900 border-4">
              {turnosPagados.map((turno) => (
                <TurnoCard key={turno.idTurno} turno={turno} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No se encontraron turnos.</p>
        )}
      </div>
    );
  };
  
  export default ConsultarTurnosSection;
