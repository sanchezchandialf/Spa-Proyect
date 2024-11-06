import { useForm } from "react-hook-form";
import { FormInput } from "../UtilitiesGenericas/FormInput";
import useAxios from '../api/useAxios';
import toast from 'react-hot-toast';
import { useLogin } from "../context/LoginContext";
import { useState } from "react";

const RegisterProfecional = () => {

    const { handleModalClose } = useLogin();
    const { register, handleSubmit, setError, watch, reset, formState: { errors, isSubmitting } } = useForm();
    const passwordValue = watch("passwordRegisterP");

    const axios = useAxios();

    const [rol, setRol] = useState("Profesional");

    const onSubmit = async (data) => {
        const transformedData = Object.keys(data).reduce((acc, key) => {
            const originalKey = key.replace("RegisterP", "");
            acc[originalKey] = data[key];
            return acc;
        }, {});

        const { confirmPassword, telefono, ...formData } = transformedData; // Excluye confirmPassword
    
        try {
            const endpoint = rol === "Profesional" ? "/api/auth/registerProf" : "/api/auth/registerSecretario";
            const response = await axios.post(endpoint, formData);

            if (response.status === 200) {
                toast.success('Se creó la cuenta correctamente, ya puede iniciar sesión');
                handleClose();
            }
        } catch (error) {
            if (!error?.response) {
                setError("root", {
                    message: "Error al intentar conectarse con el servidor",
                });
            } else if (error.response?.status === 400) {
                const errorMessage = error.response.data || "Error en el registro";
                setError("root", {
                    message: errorMessage,
                });
            } else {
                setError("root", {
                    message: "Error inesperado durante el registro",
                });
            }
            console.error('Error registrando el usuario:', error);
        }
    };

    const handleClose = () => {
        reset();
        handleModalClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#344C3D]  border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-90 relative max-h-[90vh] overflow-auto">
                <button onClick={handleClose}
                    className="absolute top-1 right-1 text-white hover:text-gray-300 bg-transparent font-extrabold rounded-lg text-sm px-4 py-2"
                    aria-label="Cerrar">x</button>

                <section>
                    <h1 className="text-4xl text-white font-bold text-center mb-6">Registrar empleado</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Nuevo select para elegir el rol */}
                        <div className="mb-4">
                            <label htmlFor="rol" className="block text-white mb-2">Rol del empleado:</label>
                            <select
                                id="rol"
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                                className="w-full p-2 rounded-md bg-white text-slate-900"
                            >
                                <option value="Profesional">Profesional</option>
                                <option value="Secretario">Secretario</option>
                            </select>
                        </div>

                        {/* Sección con Flexbox para columnas responsivas */}
                        <div className="flex flex-col sm:flex-row sm:gap-4">
                            <div className="flex-1 mb-4">
                                <FormInput textLabel="Usuario" name="usernameRegisterP" register={register} type="text"
                                    options={{
                                        required: "Nombre de usuario es necesario",
                                    }} />
                                {errors.usernameRegisterP && <div className="text-red-500">{errors.usernameRegisterP.message}</div>}
                            </div>

                            <div className="flex-1 mb-4">
                                <FormInput textLabel="Email" name="emailRegisterP" register={register} type="email"
                                    options={{
                                        required: "Email es necesario",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Email inválido"
                                        }
                                    }} />
                                {errors.emailRegisterP && <div className="text-red-500">{errors.emailRegisterP.message}</div>}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:gap-4">
                            <div className="flex-1 mb-4">
                                <FormInput textLabel="Nombre" name="nombreRegisterP" register={register} type="text"
                                    options={{
                                        required: "Su nombre es necesario",
                                    }} />
                                {errors.nombreRegisterP && <div className="text-red-500">{errors.nombreRegisterP.message}</div>}
                            </div>

                            <div className="flex-1 mb-4">
                                <FormInput textLabel="Apellido" name="apellidoRegisterP" register={register} type="text"
                                    options={{
                                        required: "Apellido es necesario",
                                    }} />
                                {errors.apellidoRegisterP && <div className="text-red-500">{errors.apellidoRegisterP.message}</div>}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:gap-4">
                            <div className="flex-1 mb-4">
                                <FormInput textLabel="Teléfono" name="telefonoRegisterP" register={register} type="text"
                                    options={{
                                        required: "Teléfono es necesario",
                                    }} />
                                {errors.telefonoRegisterP && <div className="text-red-500">{errors.telefonoRegisterP.message}</div>}
                            </div>

                            <div className="flex-1 mb-4">
                                <FormInput textLabel="DNI" name="dniRegisterP" register={register} type="text"
                                    options={{
                                        required: "DNI es necesario",
                                    }} />
                                {errors.dniRegisterP && <div className="text-red-500">{errors.dniRegisterP.message}</div>}
                            </div>
                        </div>

                        {/* Contraseña y confirmación de contraseña */}
                        <div className="flex flex-col sm:flex-row sm:gap-4 mt-4">
                            <div className="flex-1 mb-4">
                                <FormInput type="password" textLabel="Contraseña" name="passwordRegisterP" register={register}
                                    options={{
                                        required: "Contraseña es necesaria",
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[\w\W]{8,16}$/,
                                            message: "Debe tener entre 8 y 16 caracteres.\nAl menos una letra y un número"
                                        }
                                    }} />
                                {errors.passwordRegisterP && <div className="text-red-500 whitespace-pre">{errors.passwordRegisterP.message}</div>}
                            </div>

                            <div className="flex-1 mb-4">
                                <FormInput type="password" textLabel="Confirmar contraseña" name="confirmPasswordRegisterP" register={register}
                                    options={{
                                        required: "Confirma tu contraseña",
                                        validate: value =>
                                            value === passwordValue || "Las contraseñas no coinciden"
                                    }} />
                                {errors.confirmPasswordRegisterP && <div className="text-red-500">{errors.confirmPasswordRegisterP.message}</div>}
                            </div>
                        </div>

                        {errors.root && <div className="text-red-500 mt-4">{errors.root.message}</div>}

                        <button type="submit" disabled={isSubmitting}
                            className="w-full mt-6 rounded-full bg-white text-slate-900 hover:text-white hover:bg-slate-900 py-2 transition-colors duration-300">
                            {isSubmitting ? "Guardando..." : "Confirmar"}
                        </button>

                        
                    </form>
                </section>
            </div>
        </div>
    );
}

export default RegisterProfecional;
