import React from 'react';
import { useForm } from 'react-hook-form';
import { FetchApi } from '../../api/Common';
import { toast } from 'react-hot-toast';

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
        <div className="w-full min-h-screen bg-[#EDEID2] text-[#412F26]">
            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    {/* Left side with title and description */}
                    <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#6A6F4C]">Estamos para vos.</h1>
                        <p className="text-lg md:text-xl">
                            En nuestro centro de spa, valoramos tu bienestar. No dudes en hacernos cualquier consulta
                            para que podamos ayudarte a encontrar el tratamiento perfecto para ti.
                        </p>
                    </div>

                    {/* Right side with the form */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-[#CBB89D] p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#5D2510]">Realiza tu Consulta</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label htmlFor="nombrePersona" className="block text-sm font-medium">Nombre</label>
                                    <input
                                        type="text"
                                        id="nombrePersona"
                                        {...register('nombrePersona', { required: 'El nombre es obligatorio' })}
                                        className="w-full mt-1 p-2 bg-[#EDEID2] border border-[#806044] rounded text-[#412F26]"
                                    />
                                    {errors.nombrePersona && (
                                        <p className="text-[#5D2510] text-xs mt-1">{errors.nombrePersona.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
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
                                        className="w-full mt-1 p-2 bg-[#EDEID2] border border-[#806044] rounded text-[#412F26]"
                                    />
                                    {errors.email && (
                                        <p className="text-[#5D2510] text-xs mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="temaConsulta" className="block text-sm font-medium">Tema de la Consulta</label>
                                    <input
                                        type="text"
                                        id="temaConsulta"
                                        {...register('temaConsulta', { required: 'El tema de la consulta es obligatorio' })}
                                        className="w-full mt-1 p-2 bg-[#EDEID2] border border-[#806044] rounded text-[#412F26]"
                                    />
                                    {errors.temaConsulta && (
                                        <p className="text-[#5D2510] text-xs mt-1">{errors.temaConsulta.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="textoConsulta" className="block text-sm font-medium">Consulta</label>
                                    <textarea
                                        id="textoConsulta"
                                        {...register('textoConsulta', { required: 'La consulta es obligatoria' })}
                                        rows="4"
                                        className="w-full mt-1 p-2 bg-[#EDEID2] border border-[#806044] rounded text-[#412F26]"
                                    />
                                    {errors.textoConsulta && (
                                        <p className="text-[#5D2510] text-xs mt-1">{errors.textoConsulta.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2 bg-[#6A6F4C] text-[#EDEID2] font-semibold rounded hover:bg-[#806044] transition duration-300"
                                >
                                    Enviar Consulta
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultaForm;