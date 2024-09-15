import React from 'react';
import { useForm } from 'react-hook-form';
import { FetchApi } from '../../api/Common';
import toast from 'react-hot-toast';

const ConsultaForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const { nombrePersona, temaConsulta, textoConsulta, email } = data;
            const response = await FetchApi({
                path: 'api/consulta/crear',
                method: 'POST',
                payload: {
                    nombrePersona,
                    temaConsulta,
                    textoConsulta,
                    email,
                },
            });

            if (response.code === 201) {
                toast.success('Consulta enviada correctamente');
                reset();
            } else {
                toast.error('Error al enviar la consulta');
            }
        } catch (error) {
            toast.error('Ocurrió un error inesperado');
        }
    };

    return (
        <div className="w-full bg-[#2b2b2b] text-white p-10 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6">Realiza tu Consulta</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="nombrePersona" className="block text-lg font-medium">Nombre</label>
                    <input
                        type="text"
                        id="nombrePersona"
                        {...register('nombrePersona', { required: 'El nombre es obligatorio' })}
                        className="w-full mt-2 p-3 bg-[#333] border border-gray-600 rounded-lg"
                    />
                    {errors.nombrePersona && (
                        <p className="text-red-500 text-sm mt-1">{errors.nombrePersona.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-lg font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', {
                            required: 'El email es obligatorio',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Email inválido",
                            },
                        })}
                        className="w-full mt-2 p-3 bg-[#333] border border-gray-600 rounded-lg"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="temaConsulta" className="block text-lg font-medium">Tema de la Consulta</label>
                    <input
                        type="text"
                        id="temaConsulta"
                        {...register('temaConsulta', { required: 'El tema de la consulta es obligatorio' })}
                        className="w-full mt-2 p-3 bg-[#333] border border-gray-600 rounded-lg"
                    />
                    {errors.temaConsulta && (
                        <p className="text-red-500 text-sm mt-1">{errors.temaConsulta.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="textoConsulta" className="block text-lg font-medium">Consulta</label>
                    <textarea
                        id="textoConsulta"
                        {...register('textoConsulta', { required: 'La consulta es obligatoria' })}
                        rows="4"
                        className="w-full mt-2 p-3 bg-[#333] border border-gray-600 rounded-lg"
                    />
                    {errors.textoConsulta && (
                        <p className="text-red-500 text-sm mt-1">{errors.textoConsulta.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-[#008080] text-lg font-semibold rounded-lg hover:bg-[#006666] transition duration-300"
                >
                    Enviar Consulta
                </button>
            </form>
        </div>
    );
};

export default ConsultaForm;
