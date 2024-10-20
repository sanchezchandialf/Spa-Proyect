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
    const [selectedMonths, setSelectedMonths] = useState(1); // Default to 1 month
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

    const handleMonthsChange = (e) => setSelectedMonths(Number(e.target.value));

    const getDayNumber = (day) => {
        const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        return days.indexOf(day) + 1; // Mapeo Lunes = 1, ..., Sábado = 6
    };

    const getNextDate = (dayNumber) => {
        const today = new Date();
        const todayDayNumber = today.getDay() === 0 ? 7 : today.getDay(); // Domingo = 7

        let daysUntilNext = dayNumber - todayDayNumber;

        // Si el día seleccionado es hoy o un día pasado en esta semana, mover al siguiente ciclo
        if (daysUntilNext <= 0) {
            daysUntilNext += 7; // Salta a la próxima semana
        }

        const nextDate = new Date();
        nextDate.setDate(today.getDate() + daysUntilNext);
        return nextDate;
    };

    const createTurno = async (fecha) => {
        console.log(idUsuario);
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

    const onSubmit = async (data) => {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + selectedMonths); // Define la cantidad de meses seleccionados

        const newResults = [];
        let hasSuccess = false;

        try {
            for (const day of selectedDays) {
                const dayNumber = getDayNumber(day);
                let currentDate = getNextDate(dayNumber);

                while (currentDate <= endDate) {
                    if (currentDate > startDate) { // Validación para no crear en el día actual
                        const result = await createTurno(currentDate.toISOString().split('T')[0]);
                        newResults.push(result);
                        if (result.success) hasSuccess = true;
                    }
                    currentDate.setDate(currentDate.getDate() + 7); // Repite cada semana
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
                    <form onSubmit={handleSubmit(onSubmit)}>
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

                        {/* Month selection */}
                        <div className="mb-6">
                            <label htmlFor="months" className="block text-lg font-semibold text-[#35522B] mb-2">
                                Selecciona la cantidad de meses:
                            </label>
                            <select
                                id="months"
                                value={selectedMonths}
                                onChange={handleMonthsChange}
                                className="w-full p-2 border-2 border-[#A7B59E] rounded-md text-[#35522B] bg-white"
                            >
                                {[...Array(12).keys()].map(m => (
                                    <option key={m + 1} value={m + 1}>{m + 1} {m + 1 === 1 ? 'mes' : 'meses'}</option>
                                ))}
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col space-y-4">
                            <button type="submit" className="w-full bg-green-100 hover:bg-green-200 text-[#35522B] font-bold py-2 px-4 rounded-md transition duration-300 border-2 border-[#35522B]">
                                Añadir turnos
                            </button>
                        </div>
                    </form>
                </div>

                {results.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/2">
                        <h2 className="text-xl font-bold text-[#35522B] mb-4">Resultados:</h2>
                        <div className="max-h-[60vh] overflow-y-auto">
                            {results.map((result, index) => (
                                <div key={index} className={`p-4 border ${result.success ? 'border-green-500' : 'border-red-500'} mb-4`}>
                                    <p>Fecha: {result.fecha}</p>
                                    <p>Hora de inicio: {result.horaInicio}</p>
                                    <p>Estado: {result.success ? 'Creado exitosamente' : 'Turno ya existente'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CrearTurnoVacio;
