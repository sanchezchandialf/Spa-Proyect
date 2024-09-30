import { useForm } from "react-hook-form";
import { FormInput } from "../UtilitiesGenericas/FormInput";
import axios from "../api/axios";
import { useLogin } from "../context/LoginContext";
import toast from 'react-hot-toast';

const Register = ()=>{

    const {handleModalClose, handleLoginClick} = useLogin();
    const {register, handleSubmit, setError, watch, reset, formState:{errors , isSubmitting}} = useForm();
    const passwordValue = watch("passwordRegisterC");

    const onSubmit = async (data) => {
        const transformedData = Object.keys(data).reduce((acc, key) => {
            const originalKey = key.replace("RegisterC", "");
            acc[originalKey] = data[key];
            return acc;
        }, {});

        const { confirmPassword, ...formData } = transformedData;

        try {
            const response = await axios.post("/api/auth/registerCliente", formData);
            if (response.status === 200) {
                toast.success('Se creó su cuenta correctamente, inicie sesión');
                redireccionarLogin();
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
        }
    };

    const redireccionarLogin = () => {
        reset();
        handleModalClose();
        handleLoginClick();
    }

    const handleClose = () => {
        reset();
        handleModalClose();
    };

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-costum-green border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-90 relative max-h-[90vh] overflow-auto">
                <button onClick={handleClose}
                    className="absolute top-1 right-1 text-white hover:text-gray-300 bg-transparent font-extrabold rounded-lg text-sm px-4 py-2"
                    aria-label="Cerrar">X</button>

                <section>
                <h1 className="text-4xl text-white font-bold text-center mb-6">Registrarse</h1>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Cambiado a flex para evitar superposición en pantallas pequeñas */}
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                        <div className="flex-1 mb-4">
                            <FormInput textLabel="Usuario" name="usernameRegisterC" register={register} type="text"
                            options={{
                                required: "Nombre de usuario es necesario",
                            }}/>
                            {errors.usernameRegisterC && <div className="text-red-500">{errors.usernameRegisterC.message}</div>}
                        </div>

                        <div className="flex-1 mb-4">
                            <FormInput textLabel="Email" name="emailRegisterC" register={register} type="email"
                            options={{
                                required: "Email es necesario",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Email inválido"
                                }
                            }}/>
                            {errors.emailRegisterC && <div className="text-red-500">{errors.emailRegisterC.message}</div>}  
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:gap-4">
                        <div className="flex-1 mb-4">
                            <FormInput textLabel="Nombre" name="nombreRegisterC" register={register} type="text"
                            options={{
                                required: "Su nombre es necesario",
                            }}/>
                            {errors.nombreRegisterC && <div className="text-red-500">{errors.nombreRegisterC.message}</div>}
                        </div>

                        <div className="flex-1 mb-4">
                            <FormInput textLabel="Apellido" name="apellidoRegisterC" register={register} type="text"
                            options={{
                                required: "Apellido es necesario",
                            }}/>
                            {errors.apellidoRegisterC && <div className="text-red-500">{errors.apellidoRegisterC.message}</div>}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:gap-4">
                        <div className="flex-1 mb-4">
                            <FormInput textLabel="Teléfono" name="telefonoRegisterC" register={register} type="text"
                            options={{
                                required: "Teléfono es necesario",
                            }}/>
                            {errors.telefonoRegisterC && <div className="text-red-500">{errors.telefonoRegisterC.message}</div>}
                        </div>

                        <div className="flex-1 mb-4">
                            <FormInput textLabel="DNI" name="dniRegisterC" register={register} type="text"
                            options={{
                                required: "DNI es necesario",
                            }}/>
                            {errors.dniRegisterC && <div className="text-red-500">{errors.dniRegisterC.message}</div>}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:gap-4">
                        <div className="flex-1 mb-4">
                            <FormInput textLabel="Dirección" name="domicilioRegisterC" register={register} type="text"
                            options={{
                                required: "Su dirección es necesaria",
                            }}/>
                            {errors.domicilioRegisterC && <div className="text-red-500">{errors.domicilioRegisterC.message}</div>}
                        </div>
                    </div>

                    {/* Contraseña y confirmación de contraseña */}
                    <div className="flex flex-col sm:flex-row sm:gap-4 mt-4">
                        <div className="flex-1 mb-4">
                            <FormInput type="password" textLabel="Contraseña" name="passwordRegisterC" register={register}
                            options={{
                                required: "Contraseña es necesaria",
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[\w\W]{8,16}$/,
                                    message: "Debe tener entre 8 y 16 caracteres.\nAl menos una letra y un número"
                                }
                            }}/>
                            {errors.passwordRegisterC && <div className="text-red-500 whitespace-pre">{errors.passwordRegisterC.message}</div>}
                        </div>
                        
                        <div className="flex-1 mb-4">
                            <FormInput type="password" textLabel="Confirmar contraseña" name="confirmPasswordRegisterC" register={register}
                            options={{
                                required: "Confirma tu contraseña",
                                validate: value =>
                                value === passwordValue || "Las contraseñas no coinciden"
                            }}/>
                            {errors.confirmPasswordRegisterC && <div className="text-red-500">{errors.confirmPasswordRegisterC.message}</div>}
                        </div>
                    </div>

                    {errors.root && <div className="text-red-500 mt-4">{errors.root.message}</div>}

                    <button type="submit" disabled={isSubmitting}
                    className="w-full mt-6 rounded-full bg-white text-slate-900 hover:text-white hover:bg-slate-900 py-2 transition-colors duration-300">
                        {isSubmitting ? "Guardando..." : "Confirmar"}
                    </button>

                    <div className="text-white text-center mt-4">
                        ¿Ya tienes una cuenta? <span className="cursor-pointer underline" onClick={redireccionarLogin}>Inicia sesión</span>
                    </div>
                </form>
                </section>
            </div>
        </div>
    );
}

export default Register;
