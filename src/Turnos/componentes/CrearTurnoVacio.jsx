//form para que el profecional pueda crear un turno vacio

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import useAxios from '../../api/useAxios';
import toast from 'react-hot-toast';

const CrearTurnoVacio = () => {
    const { register, handleSubmit } = useForm();
    const { idUsuario, nombreUsuario } = useAuth();
    const axiosInstance = useAxios({ ignoreAuthError: true });

    // State for select inputs
    const [selectedTime, setSelectedTime] = useState("08:00");
    const [selectedDays, setSelectedDays] = useState(["Lunes"]);
    const [results, setResults] = useState([]);

    // Handle select input changes
    const handleTimeChange = (e) => setSelectedTime(e.target.value);
    const handleDayChange = (e) => {
        const day = e.target.value;
        setSelectedDays(prevDays => 
            prevDays.includes(day) 
                ? prevDays.filter(d => d !== day) 
                : [...prevDays, day]
        );
    };

    const getDayNumber = (day) => {
        const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        return days.indexOf(day);
    };

    const getNextDate = (dayNumber) => {
        const today = new Date();
        const daysUntilNext = (dayNumber + 7 - today.getDay()) % 7;
        const nextDate = new Date(today.setDate(today.getDate() + daysUntilNext));
        return nextDate;
    };

    const createTurno = async (fecha) => {
        try {
            await axiosInstance.post('/api/turno/crear', {
                idProfesional: idUsuario,
                fecha: fecha,
                horaInicio: selectedTime
            });
            return { success: true, fecha, horaInicio: selectedTime };
        } catch (error) {
            if (error.response && error.response.status === 401) {
                return { success: false, fecha, horaInicio: selectedTime };
            } else {
                console.error('Error al crear turno:', error);
                throw error;
            }
        }
    };

    const onSubmit = async (data, period) => {
        const endDate = new Date();
        if (period === 'week') {
            endDate.setDate(endDate.getDate() + 7);
        } else if (period === 'month') {
            endDate.setMonth(endDate.getMonth() + 1);
        } else if (period === 'twoMonths') {
            endDate.setMonth(endDate.getMonth() + 2);
        }

        const newResults = [];
        let hasSuccess = false;

        try {
            for (const day of selectedDays) {
                const dayNumber = getDayNumber(day);
                let currentDate = getNextDate(dayNumber);

                while (currentDate <= endDate) {
                    const result = await createTurno(currentDate.toISOString().split('T')[0]);
                    newResults.push(result);
                    if (result.success) hasSuccess = true;
                    currentDate.setDate(currentDate.getDate() + 7);
                }
            }
            setResults(newResults);
            if (hasSuccess) {
                toast.success('Algunos turnos fueron creados exitosamente');
            } else {
                toast.error('No se pudo crear ningún turno nuevo');
            }
        } catch (error) {
            toast.error('Error al crear los turnos');
        }
    };

    return (
        <div className="flex flex-col items-center bg-[#F9DFD1] p-14">
            <h1 className="text-3xl font-bold text-[#35522B] mb-4">Hola {nombreUsuario}!</h1>
            <p className="text-xl font-semibold text-[#5B7448] mb-8">
                Añade nuevos turnos al sistema:
            </p>
            
            <div className="w-full max-w-6xl flex flex-col lg:flex-row lg:space-x-8">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/2 mb-8 lg:mb-0">
                    <form onSubmit={handleSubmit((data) => onSubmit(data, 'week'))}>
                        {/* Time selection */}
                        <div className="mb-6">
                            <label htmlFor="time" className="block text-lg font-semibold text-[#35522B] mb-2">
                                Selecciona la hora de inicio:
                            </label>
                            <select
                                id="time"
                                {...register("time")}
                                value={selectedTime}
                                onChange={handleTimeChange}
                                className="w-full p-2 border-2 border-[#A7B59E] rounded-md text-[#35522B] bg-white"
                            >
                                <option value="08:00">08:00 am</option>
                                <option value="09:00">09:00 am</option>
                                <option value="10:00">10:00 am</option>
                                <option value="11:00">11:00 am</option>
                                <option value="12:00">12:00 pm</option>
                                <option value="17:00">05:00 pm</option>
                                <option value="18:00">06:00 pm</option>
                                <option value="19:00">07:00 pm</option>
                                <option value="20:00">08:00 pm</option>
                            </select>
                        </div>

                        {/* Days of the week selection */}
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-[#35522B] mb-2">
                                Seleccione los días de la semana:
                            </label>
                            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((day) => (
                                <div key={day} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={day}
                                        value={day}
                                        checked={selectedDays.includes(day)}
                                        onChange={handleDayChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor={day} className="text-[#35522B]">{day}</label>
                                </div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col space-y-4">
                            <button type="submit" className="w-full bg-green-100 hover:bg-green-200 text-[#35522B] font-bold py-2 px-4 rounded-md transition duration-300 border-2 border-[#35522B]">
                                Añadir para esta semana
                            </button>
                            <button type="button" onClick={() => onSubmit({}, 'month')} className="w-full bg-green-100 hover:bg-green-200 text-[#35522B] font-bold py-2 px-4 rounded-md transition duration-300 border-2 border-[#35522B]">
                                Añadir para todo el mes
                            </button>
                            <button type="button" onClick={() => onSubmit({}, 'twoMonths')} className="w-full bg-green-100 hover:bg-green-200 text-[#35522B] font-bold py-2 px-4 rounded-md transition duration-300 border-2 border-[#35522B]">
                                Añadir para los próximos dos meses
                            </button>
                        </div>
                    </form>
                </div>

                {results.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/2">
                        <h2 className="text-xl font-bold text-[#35522B] mb-4">Resultados:</h2>
                        <div className="max-h-[60vh] overflow-y-auto">
                            {results.map((result, index) => (
                                <div key={index} className={`mb-2 p-2 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
                                    {result.success ? 'Turno creado: ' : 'Turno ya existente: '}
                                    {new Date(result.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}  a las {result.horaInicio}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CrearTurnoVacio;
