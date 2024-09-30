import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { ButtonComponent } from '../UtilitiesGenericas/ButtonComponent';

function Turnos({onCLose}) {
    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const tipoServicio = watch("tipoServicio", ""); // observar el valor de tipoServicio
    const [estaSeleccionado, setEstaSeleccionado] = useState(false);

    const onSubmit = (data) => {
        console.log(data);
    };

    const tiposServicios = [
        { text: "Masajes", valor: "masajes" },
        { text: "Belleza", valor: "belleza" },
        { text: "Tratamientos Faciales", valor: "faciales" },
        { text: "Tratamientos Corporales", valor: "corporales" }
    ];

    const servicios = {
        masajes: [
            { text: "Anti-stress", valor: "antiStress" },
            { text: "Descontracturantes", valor: "descontracturantes" },
            { text: "Masaje con piedras calientes", valor: "piedras" },
            { text: "Circulatorios", valor: "circulatorios" }
        ],
        belleza: [
            { text: "Lifting de pestaña", valor: "lifting" },
            { text: "Depilación facial", valor: "depilacionFacial" },
            { text: "Belleza de manos y pies", valor: "manosYPies" }
        ],
        faciales: [
            { text: "Punta de Diamante: Microexfoliación.", valor: "puntaDiamante" },
            { text: "Limpieza profunda + Hidratación", valor: "limpieza" },
            { text: "Crio frecuencia facial", valor: "frecuencia" }
        ],
        corporales: [
            { text: "VelaSlim", valor: "velaslim" },
            { text: "DermoHealth", valor: "dermohealth" },
            { text: "Criofrecuencia", valor: "criofrecuencia" },
            { text: "Ultracavitación", valor: "ultracavitacion" }
        ]
    };

    const turnosDisponibles = [
        {text:"Lunes 09:00hs", valor:"lunes-9:00"},
        {text:"Lunes 10:30hs", valor:"lunes-10:30"},
        {text:"Martes 09:00hs", valor:"martes-9:00"},
        {text:"Martes 10:30hs", valor:"martes-10:30"},
        {text:"Miercoles 09:00hs", valor:"miercoles-9:00"}
    ]

    return (
        <div className='flex flex-col bg-black mt-2 p-2 '>
            <div className="row  py-3">
                <div className="col-12">
                <span className="text-lg md:text-xl max-w-2xl mt-1 ml-2 text-white">Agende su turno online!</span>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row p-4 justify-content-around">
                    
                    <div className="col-lg-6">
                        <div className='input-group mb-3'>
                            <label className="input-group-text" htmlFor="selectTipoServicio">Categoria del servicio</label>
                            <select
                                id="selectTipoServicio"
                                className='form-select'
                                {...register("tipoServicio", {
                                    onChange: () => setEstaSeleccionado(true), // Maneja la selección
                                    required: "Seleccione una opcion"
                                })} >
                                <option value="">Seleccione una opcion</option>
                                {tiposServicios.map((item, index) => (
                                    <option key={index} value={item.valor}>
                                        {item.text}
                                    </option>
                                ))}
                            </select>
                        
                        </div>
                        {errors.tipoServicio && <div className="text-red-500 m-0">{errors.tipoServicio.message}</div>}

                    </div>
                    <div className="col-lg-6">
                        <div className='input-group mb-3'>
                            <label className="input-group-text" htmlFor="selectServicio">Servicio</label>
                            
                            <select
                                id="selectServicio"
                                className='form-select'
                                {...register("servicio",{
                                    required: "Seleccione una opcion" })}
                                disabled={!estaSeleccionado}
                            >
                                <option value="">Seleccione una opcion</option>
                                {estaSeleccionado &&
                                    servicios[tipoServicio]?.map((item, index) => (
                                        <option key={index} value={item.valor}>
                                            {item.text}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {errors.servicio && <div className="text-red-500 m-0">{errors.servicio.message}</div>}

                    </div>
                </div>
                <div className="row p-4 justify-content-left">
                <div className="col-lg-6">
                        <div className='input-group mb-3'>
                            <label className="input-group-text" htmlFor="selectTurno">Turnos disponibles</label>
                            
                            <select
                                id="selectTurno"
                                className='form-select'
                                {...register("turno",{
                                    required: "Seleccione un opcion" })}
                                disabled={!estaSeleccionado}
                            >
                                <option value="">Seleccione una opcion</option>
                                {estaSeleccionado &&
                                    turnosDisponibles.map((item, index) => (
                                        <option key={index} value={item.valor}>
                                            {item.text}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {errors.turno && <div className="text-red-500 m-0">{errors.turno.message}</div>}
                        </div>
                </div>
                <div className="row p-4 text-center justify-content-end ">

                    <div className="col-sm-2 m-1">
                        <ButtonComponent onClick={onCLose}>Cancelar</ButtonComponent>
                    </div>
                    <div className="col-sm-2 m-1">
                    <ButtonComponent >Confirmar</ButtonComponent>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default Turnos;
