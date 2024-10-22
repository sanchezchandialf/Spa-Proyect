import React, { useEffect, useState } from 'react';
import useAxios from '../../api/useAxios';
import TurnoCard from '../utilidades/TurnoCard';
import { useAuth } from '../../context/AuthContext';
import { useLogin } from "../../context/LoginContext";
import CrearTurno from '../componentes/CrearTurno';
import toast from 'react-hot-toast';

const MisTurnos = () => {
  const axiosInstance = useAxios();  
  const [turnos, setTurnos] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);
  const { nombreUsuario } = useAuth();
  const { hayUsuario, esCliente } = useAuth();
  const { handleRegisterClick } = useLogin();
  const [showTurno, setShowTurno] = useState(false);

  const fetchTurnos = async () => {
    try {
      const response = await axiosInstance.get('/api/turno/misTurnos'); 
      setTurnos(response.data.data);  
      setLoading(false);  
    } catch (err) {
      setError('Error al cargar los turnos'); 
      setLoading(false);  
    }
  };
  
  useEffect(() => {
    fetchTurnos();
  }, []);  

  const handleTurnoClick = () => {
    if (hayUsuario() && esCliente()) {
      setShowTurno(true);
    } else if (hayUsuario()) {
      setShowTurno(false);
      alert('Debe ingresar como cliente para solicitar un turno.');
    } else {
      toast.error('Debe estar registrado para solicitar un turno.');
      setShowTurno(false);
      handleRegisterClick();
    }
  };

  const handleTurnoCreado = () => {
    fetchTurnos();
    setShowTurno(false);
    toast.success('Turno creado exitosamente');
  };

  if (loading) {
    return <div>Cargando turnos...</div>;  // Mostrar un mensaje mientras se cargan los turnos
  }

  if (error) {
    return <div>Ocurrio un error inesperado</div>;  // Mostrar un mensaje de error si ocurre
  }

  return (
    <section className="min-h-screen bg-[#CCC7AE] p-6">
      <div className="w-full bg-white p-6 shadow-md">
        <h1 className="text-4xl font-bold [text-#545B55] mb-2 text-center lg:text-left">
          ¡Hola {nombreUsuario}!
        </h1>
        
        <div className="flex justify-center lg:justify-start my-4">
          <button
            onClick={handleTurnoClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:-translate-y-1"
          >
            Pedir un Turno
          </button>
        </div>
        
        {turnos.length > 0 && (
          <h2 className="text-2xl font-semibold text-[#D19793] pl-3 mb-4 text-center lg:text-left">
            Sus turnos:
          </h2>
        )}
      </div>

      {hayUsuario() && esCliente() && showTurno && <CrearTurno onTurnoCreado={handleTurnoCreado} />}

      {turnos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {turnos.map((turno) => (
            <TurnoCard key={turno.idTurno} turno={turno} />
          ))}
        </div>
      ) : (
        <div className="text-lg text-[#545B55] italic bg-[#F6CEC8] p-4 shadow-md w-full">
          No tienes turnos asignados.
        </div>
      )}
    </section>
  );
};

export default MisTurnos;
