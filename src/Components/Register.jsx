import { useForm } from "react-hook-form";
import { FormInput } from "./ui/FormInput";

const Register = ({ isOpen, onClose })=>{

    const {register, handleSubmit, setError, watch, reset, 
        formState:{errors , isSubmitting}} = useForm();

    const passwordValue = watch("password");

    //aca deberia estar el codigo para guardar los datos en la bd
    const onSubmit = async (data)=>{
        try{
            // esperar a que se guarde correctamente
            await new Promise ((resolve) => setTimeout(resolve, 2000));
            console.log(data);
        } catch (error){
            setError("email", {
                message:"Este email ya esta en uso",
            })
        }
    }

    const handleClose = () => {
        reset(); // Restablecer los valores del formulario
        onClose(); 
    };

    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-costum-green border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-90  relative whitespace-normal overflow-wrap-normal">
                <button onClick={handleClose}
                    className="absolute top-1 right-1 text-white hover:text-gray-300 text-justify-center bg-transparent font-extrabold rounded-lg text-sm px-4 py-2 font-mono"
                    aria-label="Cerrar">x</button>

                <h1 className="text-4xl text-white font-bold text-center mb-6">Registrarse</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row p-1 justify-content-around">
                        <div className="col-lg-6">
                            {/*INPUT NOMBRE DE USUARIO*/}
                            <FormInput textLabel="Usuario" name="usuario" register={register} type="text"
                            options={{
                                required:"Nombre de usuario es necesario",
                            }}/>
                            {errors.usuario && <div className="text-red-500 m-0">{errors.usuario.message}</div>}
                        </div>

                        <div className="col-lg-6">
                          {/*INPUT EMAIL*/}
                            <FormInput textLabel="Email" name="email" register={register} type="email"
                            options={{
                                required:"Email es necesario",
                                pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message:"Email invalido"
                                }}}/>
                            {errors.email && <div className="text-red-500 m-0">{errors.email.message}</div>}  
                        </div>
                    </div>
                    <div className="row p-1 justify-content-around">
                        <div className="col-lg-6">
                            {/*INPUT NOMBRE*/}
                            <FormInput textLabel="Nombre" name="nombre" register={register} type="text"
                            options={{
                                required:"Su nombre es necesario",
                            }}/>
                            {errors.nombre && <div className="text-red-500 m-0">{errors.nombre.message}</div>}
                        </div>
                        <div className="col-lg-6">
                           {/*INPUT APELLIDO*/}
                            <FormInput textLabel="Apellido" name="apellido" register={register} type="text"
                            options={{
                                required:"Apellido es necesario",
                            }}/>
                            {errors.apellido && <div className="text-red-500 m-0">{errors.apellido.message}</div>}
                        </div>
                    </div>
                    <div className="row p-1 justify-content-around">
                        <div className="col-lg-6">
                            {/*INPUT TELEFONO*/}
                            <FormInput textLabel="Telefono" name="telefono" register={register} type="text"
                            options={{
                                required:"Telefono es necesario",
                            }}/>
                            {errors.telefono && <div className="text-red-500 m-0">{errors.telefono.message}</div>}
                        </div>
                        <div className="col-lg-6">
                            {/*INPUT DNI*/}
                            <FormInput textLabel="DNI" name="dni" register={register} type="text"
                            options={{
                                required:"DNI es necesario",
                            }}/>
                            {errors.dni && <div className="text-red-500 m-0">{errors.dni.message}</div>}
                        </div>
                    </div>
                    <div className="row p-1 justify-content-around">
                        <div className="col-lg-12">
                            {/*INPUT DOMICILIO*/}
                            <FormInput textLabel="Direccion" name="domicilio" register={register} type="text"
                            options={{
                                required:"Su direccion es necesaria",
                            }}/>
                            {errors.domicilio && <div className="text-red-500 m-0">{errors.domicilio.message}</div>}
                        </div>
                    </div>
                    <div className="row p-1 justify-content-around">
                        <div className="col-lg-6">
                        {/*INPUT CONTRASEÑA*/}
                        <FormInput type="password"
                            textLabel="Contraseña"  name="password" register={register} 
                            options={{
                            required: "Contraseña es necesaria",
                            pattern: {value:/^(?=.*[A-Za-z])(?=.*\d)[\w\W]{8,16}$/,
                                message:"Debe tener entre 8 y 16 caracteres\nAl menos una letra y un numero"
                            }}}/>
                    {errors.password && <div className="text-red-500 whitespace-pre">{errors.password.message}</div>}
                        </div>
                        <div className="col-lg-6">
                            {/*INPUT CONFIRMAR CONTRASEÑA*/}
                            <FormInput type="password" textLabel="Confirmar contraseña" name="confirmPassword" register={register}
                            options={{
                                required: "Confirma tu contraseña",
                                validate: value =>
                                value === passwordValue || "Las contraseñas no coinciden"
                            }}/>
                            {errors.confirmPassword && <div className="text-red-500 m-0">{errors.confirmPassword.message}</div>}
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting}
                    className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-slate-900 hover:text-white hover:bg-slate-900 py-2 transition-colors duration-300"
                    >{isSubmitting ? "Guardando..." : "Confirmar"}</button>

                    <div>
                        <span className="text-white m-4">¿Ya tinenes una cuenta? <a href="/Register" className="hover:underline">Inicia secion</a></span>
                    </div>

                </form>
            </div>
        </div>
        
    );
}

export default Register;