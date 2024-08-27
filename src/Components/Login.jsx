import { useForm } from "react-hook-form";
import { FormInput } from "./ui/FormInput";

const Login = ({ isOpen, onClose })=>{

    const {register, handleSubmit, setError, reset, 
        formState:{errors , isSubmitting}} = useForm();


    //aca deberia estar el codigo para guardar los datos en la bd
    const onSubmit = async (data)=>{
        try{
            // esperar a que se guarde correctamente
            await new Promise ((resolve) => setTimeout(resolve, 2000));
            console.log(data);
            //throw console.error();
            
        } catch (error){
            setError("root", {
                message:"Usuario no encontrado",
            })
        }
        // catch (error){
        //     setError("root",{
        //         message:"Contaseña incorrecta",
        //     })
        // }
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

                <h1 className="text-4xl text-white font-bold text-center mb-6">Iniciar Secion</h1>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormInput textLabel="Email" name="email" register={register} type="email"
                    options={{
                        required:"Email es necesario",
                        pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message:"Email invalido"
                        }}}
                    />
                    {errors.email && <div className="text-red-500 m-0">{errors.email.message}</div>}

                    
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
                        <span className="text-white m-4">¿No tienes una cuenta? <a href="/Register" className="hover:underline">Registrate</a></span>
                    </div>

                </form>
            </div>
        </div>
        
    );
}

export default Login;