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

  return (<section>
    <h1>Hola {nombre}!</h1>
      {turnos.length > 0 ? (
        <>
            <h2>Sus turnos:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {turnos.map((turno) => (
            <TurnoCard key={turno.idTurno} turno={turno} />  // Usar TurnoCard para cada turno
            ))}
            </div>
            
        </>
        
      ) : (
        <div>No tienes turnos asignados.</div>  // Mensaje si no hay turnos
      )}
    
  </section>
    
  );
};

export default MisTurnos;

