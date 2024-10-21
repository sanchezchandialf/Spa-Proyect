import React, { useState, useEffect } from 'react';
import useAxios from '../api/useAxios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
