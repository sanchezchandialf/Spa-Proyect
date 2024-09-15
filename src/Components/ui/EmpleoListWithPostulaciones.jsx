import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios'; // Importar el hook personalizado

const EmpleoListWithPostulaciones = () => {
    const axiosInstance = useAxios(); // Usar el hook personalizado
    const [empleos, setEmpleos] = useState([]);
    const [selectedEmpleo, setSelectedEmpleo] = useState(null);
    const [postulaciones, setPostulaciones] = useState([]);
    const [loading, setLoading] = useState(false);

    // Obtener la lista de empleos
    const fetchEmpleos = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/api/empleo/listar');
            setEmpleos(response.data.data);
        } catch (error) {
            console.error('Error al obtener los empleos', error);
        } finally {
            setLoading(false);
        }
    };

    // Obtener postulaciones para un empleo seleccionado
    const handleViewPostulaciones = async (empleoId) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/empleo/${empleoId}/postulaciones`);
            setPostulaciones(response.data);
            setSelectedEmpleo(empleoId);
        } catch (error) {
            console.error('Error al obtener las postulaciones', error);
        } finally {
            setLoading(false);
        }
    };

    // Descargar el CV de una postulacion
    const handleDownloadCv = async (postulacionId, fileName) => {
        try {
            const response = await axiosInstance.get(`/api/postulacion/download/${postulacionId}`, {
                responseType: 'blob', // Asegurarse de que se reciba el archivo como blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // Usa el nombre del archivo aquí
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error al descargar el archivo', error);
        }
    };

    useEffect(() => {
        fetchEmpleos();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48 text-gray-600 text-lg">
                Cargando...
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Lista de Empleos</h2>
            <ul className="space-y-4">
                {empleos.map((empleo) => (
                    <li
                        key={empleo.idEmpleo}
                        className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition cursor-pointer"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{empleo.titulo}</h3>
                        <p className="text-sm text-gray-600">{empleo.descripcion}</p>
                        <button
                            onClick={() => handleViewPostulaciones(empleo.idEmpleo)}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                        >
                            Ver postulaciones
                        </button>
                    </li>
                ))}
            </ul>

            {/* Lista de postulaciones */}
            {selectedEmpleo && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Postulaciones para el empleo ID {selectedEmpleo}
                    </h3>
                    <ul className="space-y-4">
                        {postulaciones.map((postulacion) => (
                            <li
                                key={postulacion.idPostulacion}
                                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
                            >
                                <span className="text-sm text-gray-600">Postulante ID: {postulacion.idPostulacion}</span>
                                <button
                                    onClick={() => handleDownloadCv(postulacion.idPostulacion, postulacion.cvFileName)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                >
                                    Descargar CV
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EmpleoListWithPostulaciones;
