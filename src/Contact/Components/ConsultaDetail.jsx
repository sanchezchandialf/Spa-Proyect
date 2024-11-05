import React, { useState, useEffect } from 'react';
import useAxios from '../../api/useAxios';
import toast from 'react-hot-toast';

const ConsultaDetail = ({ consultaId }) => {
  const [consulta, setConsulta] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  const fetchConsulta = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/consulta/${consultaId}`);
      setConsulta(response.data);
    } catch (error) {
      console.error('Error detallado:', error);
      toast.error('Error al obtener la consulta: ' + error.message);
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
