import React, { useState } from 'react';
import useAxios from '../../api/useAxios';

export const Responder = ({ consultaId }) => {
    const [textoRespuesta, setTextoRespuesta] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const axios = useAxios();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        console.log(consultaId);

        try {
            const response = await axios.post(`/api/consulta/${consultaId}/respuestas/crear`, { textoRespuesta });
            console.log('Respuesta enviada:', response.data);
            alert('Respuesta enviada con éxito');
        } catch (error) {
            console.error('Error al responder la consulta:', error);
            setError('Error al enviar la respuesta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Responder Consulta</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="textoRespuesta">Respuesta:</label>
                    <textarea
                        id="textoRespuesta"
                        value={textoRespuesta}
                        onChange={(e) => setTextoRespuesta(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar Respuesta'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Responder;
