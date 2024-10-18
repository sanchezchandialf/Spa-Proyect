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
    minDate.setDate(minDate.getDate() + 1);  // Mínimo: un día después del actual

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 20); // Máximo: 20 días desde hoy

    const [categorias, setCategorias] = useState([]);  // Lista de categorías
    const [horarios, setHorarios] = useState([]);  // Turnos disponibles

    const [selectedDate, setSelectedDate] = useState(minDate); // Fecha seleccionada
    const { register, handleSubmit, setValue, watch, reset } = useForm();

    const selectedCategoria = watch('categoriaNombre'); // Categoría seleccionada
    const selectedFecha = watch('fecha'); // Fecha seleccionada
    const selectedHoraInicio = watch('horaInicio'); // Hora de inicio seleccionada
    const selectedHoraFin = watch('horaFin'); // Hora de fin seleccionada

    // Cargar categorías al montar el componente
    useEffect(() => {
        axiosInstance.get('/api/servicio/categorias')
            .then(response => setCategorias(response.data.data))
            .catch(error => console.error('Error al cargar las categorías', error));
    }, []);

    // Manejador de cambio de fecha
    const handleDateChange = (date) => {
        if (date && isWeekday(date)) {
            setSelectedDate(date);
            setValue('fecha', date.toISOString().split('T')[0]); // Guardamos la fecha en formato ISO

            // Si hay categoría seleccionada, buscar turnos disponibles para esa fecha
            if (selectedCategoria) {
                fetchTurnosDisponibles(date.toISOString().split('T')[0], selectedCategoria);
            }
        } else {
            toast.error('Los domingos no están disponibles.');
        }
    };

    // Llamada a la API para obtener los turnos disponibles
    const fetchTurnosDisponibles = (fecha, categoria) => {
        axiosInstance.get(`/api/turno/disponibles?fecha=${fecha}&categoria=${categoria}`)
            .then(response => {
                const horariosDisponibles = response.data?.data || [];
                setHorarios(horariosDisponibles);
            })
            .catch(error => {
                console.error('Error al cargar los turnos disponibles', error);
                setHorarios([]); // Si hay error, limpiar los horarios
            });
    };

    // Manejador de selección de categoría
    const handleCategoriaChange = (e) => {
        const categoriaSeleccionada = e.target.value;
        setValue('categoriaNombre', categoriaSeleccionada);

        // Si ya se ha seleccionado una fecha, buscar turnos para esa fecha y categoría
        if (selectedDate) {
            fetchTurnosDisponibles(selectedDate.toISOString().split('T')[0], categoriaSeleccionada);
        }
    };

    // Manejador de selección de horario
    const handleHorarioSeleccionado = (horario) => {
        setValue('horaInicio', horario.hora_inicio);
        setValue('horaFin', horario.hora_fin);
    };

    // Función para gestionar la creación del turno
    const onSubmit = (data) => {
        const turnoData = {
            id_cliente: idUsuario,
            fecha: data.fecha,
            horaInicio: data.horaInicio,
            horaFin: data.horaFin,
            categoria: data.categoriaNombre,
        };

        axiosInstance.post('/api/turno/crear', turnoData)
            .then(() => {
                toast.success('Turno creado con éxito');
                reset(); // Reseteamos el formulario
            })
            .catch(error => {
                console.error('Error al crear el turno', error);
            });
    };

    // Verificar si un día es domingo
    const isWeekday = (date) => date.getDay() !== 0;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
            {/* Paso 1: Seleccionar Categoría */}
            <div className="mb-4">
                <label htmlFor="selectCategoria" className="block text-sm font-medium mb-2">
                    Selecciona una categoría:
                </label>
                <select
                    id="selectCategoria"
                    className="block w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
                    {...register('categoriaNombre')}
                    onChange={handleCategoriaChange}
                >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.idCategoria} value={categoria.nombre}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Paso 2: Seleccionar Fecha */}
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
                    filterDate={isWeekday}
                />
                <input type="hidden" {...register('fecha')} />
            </div>

            {/* Paso 3: Seleccionar Horario */}
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
                    <option value="">Seleccione un horario</option>
                    {horarios.map((horario, index) => (
                        <option
                            key={index}
                            value={JSON.stringify({
                                hora_inicio: horario.hora_inicio,
                                hora_fin: horario.hora_fin,
                            })}
                        >
                            {horario.hora_inicio} - {horario.hora_fin}
                        </option>
                    ))}
                </select>
                <input type="hidden" {...register('horaInicio')} />
                <input type="hidden" {...register('horaFin')} />
            </div>

            {/* Botón para Crear el Turno */}
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                disabled={!selectedHoraInicio || !selectedHoraFin}
            >
                Crear Turno
            </button>
        </form>
    );
};

export default CrearTurno;
