import React, { useState, useEffect } from 'react';
import useAxios from '../../api/useAxios.jsx';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CustomDatePicker from '../utilidades/CustumDatePicker.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const CrearTurno = () => {
    const { idUsuario } = useAuth();  // ID del usuario autenticado
    const axiosInstance = useAxios(); // Instancia de Axios para llamadas a la API

    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 3);  // Mínimo: tres días después del actual

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 20); // Máximo: 20 días desde hoy

    const { register, handleSubmit, setValue, watch, reset } = useForm();

    const [horarios, setHorarios] = useState([]);  // Turnos disponibles
    const [servicios, setServicios] = useState([]); // Servicios disponibles
    const [selectedServicios, setSelectedServicios] = useState([]); // Servicios seleccionados
    const [selectedTurno, setSelectedTurno] = useState(null); // Turno seleccionado
    const [selectedDate, setSelectedDate] = useState(minDate); // Fecha seleccionada

    const selectedFecha = watch('fecha'); // Fecha seleccionada
    const selectedServicio = watch('servicio'); // Servicio seleccionado

    // Cargar servicios al montar el componente
    useEffect(() => {
        axiosInstance.get('/api/servicio/listar')
            .then(response => setServicios(response.data.data))
            .catch(error => console.error('Error al cargar los servicios', error));
    }, []);

    // Manejador de cambio de fecha
    const handleDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
            setValue('fecha', date.toISOString().split('T')[0]);

            // Cargar los turnos disponibles para la fecha seleccionada
            fetchTurnosDisponibles(date.toISOString().split('T')[0]);
        }
    };

    // Llamada a la API para obtener los turnos disponibles en la fecha seleccionada
    const fetchTurnosDisponibles = (fecha) => {
        axiosInstance.get(`/api/turno/disponibles?fecha=${fecha}`)
            .then(response => {
                const horariosDisponibles = response.data?.data || [];
                setHorarios(horariosDisponibles);
            })
            .catch(error => {
                console.error('Error al cargar los turnos disponibles', error);
                setHorarios([]); // Si hay error, limpiar los horarios
            });
    };

    // Manejador de selección de horario
    const handleHorarioSeleccionado = (turno) => {
        setSelectedTurno(turno);
        setValue('idTurno', turno.idTurno);
    };

    // Agregar servicio seleccionado a la lista de servicios
    const agregarServicio = () => {
        const servicio = servicios.find(s => s.idServicio === parseInt(selectedServicio));
        if (servicio && !selectedServicios.some(s => s.idServicio === servicio.idServicio)) {
            setSelectedServicios([...selectedServicios, servicio]);
            setValue('servicio', ''); // Resetear selección de servicio
        }
    };

    // Función para gestionar la creación del turno
    const onSubmit = () => {
        if (!selectedTurno) {
            toast.error('Debe seleccionar un horario para crear un turno');
            return;
        }

        const servicioIds = selectedServicios.map(s => s.idServicio);
        const turnoData = {
            idTurno: selectedTurno.idTurno,
            servicioIds: servicioIds
        };

        axiosInstance.post('/api/turno/asignar', turnoData)
            .then(() => {
                toast.success('Turno creado con éxito');
                reset(); // Reseteamos el formulario
                setSelectedServicios([]); // Limpiamos la lista de servicios seleccionados
            })
            .catch(error => {
                console.error('Error al crear el turno', error);
                toast.error('Error al crear el turno');
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
            {/* Paso 1: Seleccionar Fecha */}
            <div className="mb-4">
                <label htmlFor="selectFecha" className="block text-sm font-medium mb-2">
                    Selecciona una fecha:
                </label>
                <CustomDatePicker
                    selectedFecha={selectedDate}
                    handleDateChange={handleDateChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Selecciona una fecha"
                    withPortal={true}
                />
                <input type="hidden" {...register('fecha')} />
            </div>

            {/* Paso 2: Seleccionar Horario */}
            <div className="mb-4">
                <label htmlFor="selectHora" className="block text-sm font-medium mb-2">
                    Selecciona un horario:
                </label>
                <select
                    id="selectHora"
                    className="block w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
                    onChange={(e) => handleHorarioSeleccionado(JSON.parse(e.target.value))}
                    disabled={!selectedFecha || horarios.length === 0}
                >
                    <option value="">
                        {selectedFecha ? "Seleccione un horario" : "Seleccione una fecha primero"}
                    </option>
                    {horarios.map((horario) => (
                        <option
                            key={horario.idTurno}
                            value={JSON.stringify(horario)}
                        >
                            {horario.horaInicio} - Profesional: {horario.profesional.usuario.nombre} {horario.profesional.usuario.apellido}
                        </option>
                    ))}
                </select>
                {selectedFecha && horarios.length === 0 && (
                    <p className="text-red-500 text-sm mt-2">No hay horarios disponibles para esta fecha.</p>
                )}
            </div>

            {/* Paso 3: Seleccionar Servicio */}
            <div className="mb-4">
                <label htmlFor="selectServicio" className="block text-sm font-medium mb-2">
                    Selecciona un servicio:
                </label>
                <select
                    id="selectServicio"
                    className="block w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
                    {...register('servicio')}
                >
                    <option value="">Seleccione un servicio</option>
                    {servicios.map((servicio) => (
                        <option key={servicio.idServicio} value={servicio.idServicio}>
                            {servicio.categoria.nombre} - {servicio.detallesServicio}
                        </option>
                    ))}
                </select>
            </div>

            {/* Lista de servicios agregados */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Servicios seleccionados:</h3>
                <div className="bg-gray-800 p-4 rounded-lg">
                    {selectedServicios.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {selectedServicios.map((servicio, index) => (
                                <li key={index} className="mb-1">
                                    {servicio.categoria.nombre} - {servicio.detallesServicio}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No has seleccionado ningún servicio aún.</p>
                    )}
                </div>
                <button 
                    type="button" 
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    onClick={agregarServicio}
                >
                    Agregar servicio
                </button>
            </div>

            {/* Botón para Crear el Turno */}
            <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                disabled={!selectedTurno || selectedServicios.length === 0}
            >
                Crear Turno
            </button>
        </form>
    );
};

export default CrearTurno;
