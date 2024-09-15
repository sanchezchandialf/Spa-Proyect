import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostulacionModal from './PostulacionesModal';

const EmpleoList = () => {
    const [empleos, setEmpleos] = useState([]);
    const [selectedEmpleo, setSelectedEmpleo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchEmpleos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/empleo/listar');
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
        <div className="w-full text-white">
            <div className="grid grid-cols-1 gap-6">
                {empleos.map((empleo) => (
                    <div key={empleo.idEmpleo} className="w-full bg-[#222] p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        <h3 className="text-2xl font-semibold mb-4">{empleo.titulo}</h3>
                        <p className="text-lg mb-4">{empleo.descripcion}</p>
                        <button
                            onClick={() => openModal(empleo)}
                            className="w-full py-3 bg-[#008080] text-white text-lg font-semibold rounded-lg hover:bg-[#006666] transition duration-300"
                        >
                            Postularse
                        </button>
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
