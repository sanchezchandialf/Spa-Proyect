import React, { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios'; 
import { useForm } from 'react-hook-form'; 
import toast from 'react-hot-toast';
import CustomDatePicker from './ui/CustumDatePicker.jsx'



const CrearTurno = ({ idCliente }) => {

    // Fecha mínima: Un día después del día actual
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 1);

    const [categorias, setCategorias] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [selectedDate, setSelectedDate] = useState(minDate);
    const axiosInstance = useAxios(); // Usamos la instancia de axios

    // Usamos useForm para gestionar los inputs del formulario
    const { register, handleSubmit, watch, setValue , reset} = useForm();

    const selectedCategoria = watch('categoriaNombre'); // Escuchamos el valor de la categoría seleccionada
    const selectedServicio = watch('servicioId'); // Escuchamos el valor del servicio seleccionado
    const selectedFecha = watch('fecha'); // Escuchamos la fecha seleccionada
    const selectedHoraInicio = watch('horaInicio'); // Escuchamos la hora de inicio seleccionada
    const selectedHoraFin = watch('horaFin'); // Añadir el campo horaFin

    // Efecto para cargar categorías al montar el componente
    useEffect(() => {
        axiosInstance.get('/api/servicio/categorias')
            .then(response => setCategorias(response.data.data))
            .catch(error => console.error('Error al cargar las categorías', error));
    }, []);

    // Efecto para cargar servicios cuando cambia la categoría seleccionada
    useEffect(() => {
        if (selectedCategoria) {
            axiosInstance.get(`/api/servicio/listar?categoria=${selectedCategoria}`)
                .then(response => setServicios(response.data.data))
                .catch(error => console.error('Error al cargar los servicios', error));
        }
    }, [selectedCategoria]);

    // Efecto para cargar horarios disponibles cuando cambia la fecha o el servicio seleccionado
    
    useEffect(() => {
        if (selectedServicio && selectedFecha) {
            axiosInstance.get(`/api/turno/disponibles?fecha=${selectedFecha}&servicioId=${selectedServicio}`)
                .then(response => {
                    // Verificar si 'horarios_disponibles' existe y es un arreglo
                    const horariosDisponibles = response.data?.horarios_disponibles;
                    if (Array.isArray(horariosDisponibles)) {
                        const horariosOrdenados = horariosDisponibles.sort((h1, h2) => {
                            const [horaInicio] = h1.hora_inicio.split(':').map(Number);
                            const [horaFin] = h2.hora_fin.split(':').map(Number);
                            return horaInicio - horaFin;
                        });
                        setHorarios(horariosOrdenados);
                    } else {
                        console.error('Horarios disponibles no es un arreglo o está indefinido.');
                        setHorarios([]); // Establecer horarios como un arreglo vacío
                    }
                })
                .catch(error => console.error('Error al cargar los horarios disponibles', error));
        }
    }, [selectedServicio, selectedFecha]);

    // Función para gestionar la creación del turno
    const onSubmit = (data) => {
        const turnoData = {
            id_cliente: idCliente,
            id_servicio: data.servicioId,
            fecha: data.fecha,
            horaInicio: data.horaInicio,
            horaFin: data.horaFin,
        };

        axiosInstance.post('/api/turno/crear', turnoData)
            .then(()=> {
                toast.success('Turno creado con éxito')
                reset();
            })
            .catch(error => {
                console.error('Error al crear el turno', error);
            });
    };

     
     // Fecha máxima: 20 días después del día actual
     const maxDate = new Date(today);
     maxDate.setDate(maxDate.getDate() + 20);
 
     // Función para verificar si el día es domingo
     const isWeekday = (date) => {
         return date.getDay() !== 0; // Deshabilitar domingos
     };

    // Manejador de cambio de fecha
    const handleDateChange = (date) => {
        if (date && isWeekday(date)) {
            setSelectedDate(date); // Actualiza la fecha seleccionada
            setValue('fecha', date.toISOString().split('T')[0]); // Llama a la función con la fecha en formato ISO
        } else if (date) {
            toast.error('Los domingos no están disponibles.');
        }
    };

    const handleHorarioSeleccionado = (horario) => {
        setValue('horaInicio', horario.horaInicio);
        setValue('horaFin', horario.horaFin);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
            {/* Paso 1: Seleccionar Categoría */}
            <div className="mb-4">
                <label htmlFor="selectCategoria" className="block text-sm font-medium mb-2">
                    Selecciona una categoría:
                </label>
                <select 
                    id="selectCategoria"
                    className="block w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                    {...register('categoriaNombre')}>
                    <option value="">Seleccione una categoría</option>
                    {categorias.map(categoria => (
                        <option key={categoria.idCategoria} value={categoria.nombre}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Paso 2: Seleccionar Servicio */}
            <div className="mb-4">
                <label htmlFor="selectServicio" className="block text-sm font-medium mb-2">
                    Selecciona un servicio:
                </label>
                <select 
                    id="selectServicio"
                    className="block w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                    {...register('servicioId')}
                    disabled={!selectedCategoria}>
                    <option value="">Seleccione un servicio</option>
                    {servicios.map(servicio => (
                        <option key={servicio.idServicio} value={servicio.idServicio}>
                            {servicio.detallesServicio}
                        </option>
                    ))}
                </select>
            </div>

            {/* Paso 3: Seleccionar Fecha */}
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
                    disabled={!selectedServicio}
                    withPortal={true}
                    filterDate={isWeekday}
                />

            </div>

            {/* Paso 4: Seleccionar Horario */}
            <div className="mb-4">
                <label htmlFor="selectHora" className="block text-sm font-medium mb-2">
                    Selecciona un horario:
                </label>
                <select 
                    id="selectHora"
                    className="block w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
                    onChange={(e) => handleHorarioSeleccionado(JSON.parse(e.target.value))}
                    disabled={!selectedFecha}>
                    <option value="">Seleccione un horario</option>
                    {horarios.map((horario, index) => (
                        <option
                            key={index}
                            value={JSON.stringify({ horaInicio: horario.hora_inicio, horaFin: horario.hora_fin })}>
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
                disabled={!selectedHoraInicio || !selectedHoraFin}>
                Crear Turno
            </button>
        </form>
    );
};

export default CrearTurno;