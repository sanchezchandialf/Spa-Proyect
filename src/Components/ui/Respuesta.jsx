import React, { useState } from 'react';

export const Responder = ({ consultaId }) => {
    const [textoRespuesta, setTextoRespuesta] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        console.log(consultaId);
        const token = localStorage.getItem('accessToken');
       /*  const apiUrl = `http://localhost:8080/api/consulta/${consultaId}/respuestas/crear`; // URL correcta */

        const apiUrl = `http://vps-4291415-x.dattaweb.com:8080/api/consulta/${consultaId}/respuestas/crear`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Agregar el token Bearer
                },
                body: JSON.stringify({ textoRespuesta }), // Cuerpo de la solicitud
            });

            if (!response.ok) {
                throw new Error('Error al responder la consulta');
            }

            const data = await response.json();
            console.log('Respuesta enviada:', data);
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
