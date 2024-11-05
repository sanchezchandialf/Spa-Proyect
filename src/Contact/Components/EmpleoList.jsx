import React, { useEffect, useState } from 'react';
import useAxios from '../../api/useAxios';
import PostulacionModal from './PostulacionesModal';

const EmpleoList = () => {
    const [empleos, setEmpleos] = useState([]);
    const [selectedEmpleo, setSelectedEmpleo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axios = useAxios();

    useEffect(() => {
        const fetchEmpleos = async () => {
            try {
                //const response = await axios.get('https://agile-flexibility-production.up.railway.app/api/empleo/listar');
                const response=await axios.get('/api/empleo/listar');
                setEmpleos(response.data.data);
            } catch (error) {
                console.error('Error al obtener los empleos', error);
            }
        };

        fetchEmpleos();
    }, []);

    const openModal = (empleo) => {
        setSelectedEmpleo(empleo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmpleo(null);
    };

    return (
        <div className="w-full bg-[#EDEID2] px-4 py-8 lg:px-16 text-[#412F26]">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6A6F4C] mb-8 text-center">Oportunidades de Empleo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {empleos.map((empleo) => (
                    <div key={empleo.idEmpleo} className="bg-[#CBB89D] rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-[#5D2510] mb-3">{empleo.titulo}</h3>
                            <p className="text-[#412F26] mb-4 line-clamp-3">{empleo.descripcion}</p>
                            <div className="flex items-center text-[#806044] mb-2">
                                <span className="mr-2">📅</span>
                                <span>{empleo.fechaPublicacion || 'Fecha no disponible'}</span>
                            </div>
                            <div className="flex items-center text-[#806044] mb-2">
                                <span className="mr-2">📍</span>
                                <span>{empleo.ubicacion || 'Ubicación no especificada'}</span>
                            </div>
                            <div className="flex items-center text-[#806044] mb-4">
                                <span className="mr-2">💰</span>
                                <span>{empleo.salario || 'Salario a convenir'}</span>
                            </div>
                            <button
                                onClick={() => openModal(empleo)}
                                className="w-full py-3 bg-[#6A6F4C] text-[#EDEID2] text-lg font-semibold rounded-lg hover:bg-[#806044] transition duration-300 shadow-md"
                            >
                                Postularse
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Postulación */}
            {isModalOpen && selectedEmpleo && (
                <PostulacionModal empleo={selectedEmpleo} onClose={closeModal} />
            )}
        </div>
    );
};

export default EmpleoList;
