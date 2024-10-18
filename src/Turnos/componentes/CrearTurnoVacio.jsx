//form para que el profecional pueda crear un turno vacio

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import useAxios from '../../api/useAxios';
import toast from 'react-hot-toast';

const CrearTurnoVacio = () => {
    const { register, handleSubmit } = useForm();
    const { idUsuario, nombreUsuario } = useAuth();
    const axiosInstance = useAxios();

    // State for select inputs
    const [selectedTime, setSelectedTime] = useState("08:00");
    const [selectedDay, setSelectedDay] = useState("Lunes");

    // Handle select input changes
    const handleTimeChange = (e) => setSelectedTime(e.target.value);
    const handleDayChange = (e) => setSelectedDay(e.target.value);

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
        } catch (error) {
            console.error('Error al crear turno:', error);
            throw error;
        }
    };

    const onSubmit = async (data, period) => {
        const dayNumber = getDayNumber(selectedDay);
        let currentDate = getNextDate(dayNumber);
        let endDate = new Date(currentDate);

        if (period === 'week') {
            // No es necesario cambiar nada para una semana
        } else if (period === 'month') {
            endDate.setMonth(endDate.getMonth() + 1);
        } else if (period === 'twoMonths') {
            endDate.setMonth(endDate.getMonth() + 2);
        }

        try {
            while (currentDate <= endDate) {
                await createTurno(currentDate.toISOString().split('T')[0]);
                currentDate.setDate(currentDate.getDate() + 7); // Avanza 7 días para el siguiente día de la semana seleccionado
            }
            toast.success('Turnos creados exitosamente');
        } catch (error) {
            toast.error('Error al crear los turnos');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9DFD1] p-4">
            <h1 className="text-3xl font-bold text-[#35522B] mb-4">Hola {nombreUsuario}!</h1>
            <p className="text-xl font-semibold text-[#5B7448] mb-8">
                Añade nuevos turnos al sistema:
            </p>
            
            <div className="bg-[#F8D8D8] p-6 rounded-lg shadow-lg max-w-lg w-full">
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

                    {/* Day of the week selection */}
                    <div className="mb-6">
                        <label htmlFor="day" className="block text-lg font-semibold text-[#35522B] mb-2">
                            Seleccione el día de la semana:
                        </label>
                        <select
                            id="day"
                            {...register("day")}
                            value={selectedDay}
                            onChange={handleDayChange}
                            className="w-full p-2 border-2 border-[#A7B59E] rounded-md text-[#35522B] bg-white"
                        >
                            <option>Lunes</option>
                            <option>Martes</option>
                            <option>Miércoles</option>
                            <option>Jueves</option>
                            <option>Viernes</option>
                            <option>Sábado</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
                        <button type="submit" className="w-full bg-[#F3BABA] hover:bg-[#F8D8D8] text-[#35522B] font-bold py-2 px-4 rounded-md transition duration-300">
                            Añadir para esta semana
                        </button>
                        <button type="button" onClick={() => onSubmit({}, 'month')} className="w-full bg-[#F3BABA] hover:bg-[#F8D8D8] text-[#35522B] font-bold py-2 px-4 rounded-md transition duration-300">
                            Añadir para todo el mes
                        </button>
                        <button type="button" onClick={() => onSubmit({}, 'twoMonths')} className="w-full bg-[#F3BABA] hover:bg-[#F8D8D8] text-[#35522B] font-bold py-2 px-4 rounded-md transition duration-300">
                            Añadir para los próximos dos meses
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CrearTurnoVacio;
