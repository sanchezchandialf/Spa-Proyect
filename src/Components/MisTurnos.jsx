import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import  TurnoCard  from './ui/TurnoCard';  

const MisTurnos = () => {
  const axiosInstance = useAxios();  
  const [turnos, setTurnos] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);
  const [nombre, setNombre] = useState("...");
  
  
    const obtenerNombreUsuario = async()=>{
    try{
        const response = await axiosInstance.get("/api/auth/userLogueado");
        if (response.status === 200 && response.data) {
            
            const n = response.data.data.nombre;
            setNombre(n);
            
        }
    }catch(error){}
    };

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
    obtenerNombreUsuario();  // Ejecutar la solicitud
  }, []);  


  if (loading) {
    return <div>Cargando turnos...</div>;  // Mostrar un mensaje mientras se cargan los turnos
  }

  if (error) {
    return <div>Ocurrio un error inesperado</div>;  // Mostrar un mensaje de error si ocurre
  }

  return (<section className="min-h-screen bg-[#CCC7AE] p-6">
  
    <div className="w-full bg-white p-6 shadow-md">
      <h1 className="text-4xl font-bold [text-#545B55] mb-2 text-center lg:text-left">
        ¡Hola {nombre}!
      </h1>
      {turnos.length > 0 && (
        <h2 className="text-2xl font-semibold text-[#D19793] pl-3 mb-4 text-center lg:text-left">
          Sus turnos:
        </h2>
      )}
    </div>

   
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

