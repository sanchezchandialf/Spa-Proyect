import React, { useState, useEffect } from 'react';
import useAxios from '../api/useAxios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
          onClick={fetchIngresos}
          className="bg-[#829672] text-white px-4 py-2 rounded hover:bg-[#344C3D] transition duration-300"
        >
          Buscar
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
