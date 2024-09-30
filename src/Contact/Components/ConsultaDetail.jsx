import React, { useState, useEffect } from 'react';
import { FetchApi } from '../../api/Common';
import toast from 'react-hot-toast';

const ConsultaDetail = ({ consultaId }) => {
  const [consulta, setConsulta] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('accessToken'); // Obtener el token del almacenamiento local

  const fetchConsulta = async () => {
    setLoading(true);
    try {
      const response = await FetchApi({
        path: `api/consulta/${consultaId}`,
        method: 'GET',
        requiresAuth: true,
        token, // Pasar el token para autenticación
      });

      if (response.code === 200) {
        setConsulta(response.data);
      } else if (response.code === 401) {
        toast.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        // Redirigir al usuario al login si es necesario
      } else {
        toast.error('Error al obtener la consulta');
      }
    } catch (error) {
      console.error('Error detallado:', error);
      toast.error('Error al obtener la consulta');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (consultaId) {
      fetchConsulta();
    }
  }, [consultaId]);

  if (loading) {
    return <div>Cargando detalles de la consulta...</div>;
  }

  return consulta ? (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{consulta.temaConsulta}</h2>
      <p className="mb-2"><strong>Nombre:</strong> {consulta.nombrePersona}</p>
      <p className="mb-2"><strong>Email:</strong> {consulta.email}</p>
      <p className="mb-2"><strong>Consulta:</strong> {consulta.textoConsulta}</p>
      <p className="mb-2">
        <strong>Contestado:</strong> {consulta.contestado ? 'Sí' : 'No'}
      </p>
    </div>
  ) : (
    <div>No se encontró la consulta.</div>
  );
};

export default ConsultaDetail;
