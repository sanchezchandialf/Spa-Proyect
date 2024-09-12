import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import { FormInput } from "./ui/FormInput";
import {  useState } from "react";
import axios from "../api/axios";

const Login = ({ isOpen, onClose })=>{

    //se actualiza el token
    const {setAuth}= useAuth();

    const navigate = useNavigate();
    const lacation = useLocation();
    //lleva al usuario a la ruta portegida a la que quiso ingresar o al inicio
    const from = lacation.state?.from?.pathname || "/";

    const {register, handleSubmit, setError, reset, 
    formState:{errors , isSubmitting}} = useForm();
    
    


    //aca deberia estar el codigo para guardar los datos en la bd
    const onSubmit = async (data)=>{
        try {
            const response = await axios.post('/api/auth/login', data);
            console.log('Usuario registrado exitosamente');
            console.log(response.data);


            const accessToken = response.data.accessToken;
            setAuth({accessToken});
            // const role = response.usuarioLogueado.roles.idRole;
            
            navigate(from, {replace: true});
            reset();
          } catch (error) {
            if(!error?.response){
                setError("root", {
                    message:"Error al intentar conectarse con el servidor",
                })
            } else if (error.response?.status === 401) {
                
                const errorMessage = error.response.data || "Usuario o contraseña incorrectos";
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
    }

    const handleClose = () => {
        reset(); // Restablecer los valores del formulario
        onClose(); 
    };

    if (!isOpen) return null;
    
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <main className="bg-costum-green border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-90  relative whitespace-normal overflow-wrap-normal">
                <button onClick={handleClose}
                    className="absolute top-1 right-1 text-white hover:text-gray-300 text-justify-center bg-transparent font-extrabold rounded-lg text-sm px-4 py-2 font-mono"
                    aria-label="Cerrar">x</button>
             
                <section>
                <h1 className="text-4xl text-white font-bold text-center mb-6">Iniciar Secion</h1>

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/*INPUT NOMBRE DE USUARIO*/}
                    <FormInput textLabel="Usuario" name="username" register={register} type="text"
                            options={{
                                required:"Nombre de usuario es necesario",
                            }}/>
                            {errors.username && <div className="text-red-500 m-0">{errors.username.message}</div>}

                    
                    <FormInput type="password"
                        textLabel="Contraseña"  name="password" register={register} 
                        options={{
                        required: "Contraseña es necesaria",}}
                    />
                    {errors.root && <div className="text-red-500 whitespace-pre mt-3">{errors.root.message}</div>}

                    <button type="submit" disabled={isSubmitting}
                    className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-slate-900 hover:text-white hover:bg-slate-900 py-2 transition-colors duration-300"
                    >{isSubmitting ? "Cargando..." : "Confirmar"}</button>

                    <div>
                        <span className="text-white m-4">¿No tienes una cuenta? <Link to="/register" className="hover:underline">Registrate</Link></span>
                    </div>
                    

                </form>
                </section>
            </main>
        </div>
        
    );
}

export default Login;