import { useForm } from "react-hook-form";
import { FormInput } from "./ui/FormInput";
import toast from 'react-hot-toast';
import { useLogin } from "../context/LoginContext";
import { useAuth } from "../context/AuthContext";
import useAxios from '../hooks/useAxios';

const Login = ()=>{

    

    const {register, handleSubmit, setError, reset, 
    formState:{errors , isSubmitting}} = useForm();

    const { login, esAdmin } = useAuth();
    const axiosInstance = useAxios();
    
    
 const {handleModalClose, handleRegisterClick}=useLogin();

    //aca deberia estar el codigo para guardar los datos en la bd
    const onSubmit = async (data) => {
        try {
          const response = await axiosInstance.post("api/auth/login", data);
          
          // Chequear si la estructura de la respuesta es la esperada
          if (response.status === 200 && response.data) {
            const { accessToken, usuarioLogueado } = response.data;
            const roles = usuarioLogueado.roles;
            const idRole = roles[0].idRole; // Asegúrate de que idRole exista
        
            // Guarda el token y el rol en el contexto usando el hook useAuth
            login(accessToken, idRole);
            console.log(idRole);
            const a = esAdmin();
            console.log(a);
            
            toast.success('Se inició sesión correctamente');
            handleClose(); // Cerrar el modal
          } else {
            throw new Error('Respuesta inesperada del servidor');
          }
      
        } catch (error) {
          // Verifica si el error es de red o falta de respuesta
          if (!error?.response) {
            setError("root", {
              message: "Error al intentar conectarse con el servidor",
            });
          } else if (error.response?.status === 401) {
            // Maneja el error de credenciales incorrectas
            setError("root", {
              message: "Usuario o contraseña incorrectos",
            });
          } else {
            // Muestra el error inesperado durante la autenticación
            setError("root", {
              message: "Error inesperado durante el inicio de sesión",
            });
          }
        }
      };
      

    const redireccionarRegister=()=>{
        reset();
        handleModalClose();
        handleRegisterClick();
    }
    const handleClose = () => {
        reset(); // Restablecer los valores del formulario
        handleModalClose();
    };

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
                        <span className="text-white m-4">¿No tienes una cuenta? <p className="cursor-pointer" onClick={redireccionarRegister}>Registrate</p></span>
                    </div>
                    

                </form>
                </section>
            </main>
        </div>
        
    );
}

export default Login;