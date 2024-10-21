import React, { useState, useEffect } from 'react';
import useAxios from '../api/useAxios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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
          value={pagado.toString()}
          onChange={(e) => setPagado(e.target.value === 'true')}
          className="border p-2 rounded"
        >
          <option value="false">No pagado</option>
          <option value="true">Pagado</option>
        </select>
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
