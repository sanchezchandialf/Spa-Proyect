import ConsultaForm from "../Components/ui/ConsultaForm";
import EmpleoList from "../Components/ui/EmpleoList";

function PagContacto() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Sección del Formulario de Consulta */}
            <div className="bg-[#1c1c1e] py-16 w-full">
                <h2 className="text-4xl font-semibold text-center text-white mb-12">Formulario de Consulta</h2>
                <div className="w-full">
                    <ConsultaForm />
                </div>
            </div>

            {/* Sección de la Lista de Empleos */}
            <div className="bg-[#181818] py-16 w-full">
                <h2 className="text-4xl font-semibold text-center text-white mb-12">Lista de Empleos</h2>
                <div className="w-full">
                    <EmpleoList />
                </div>
            </div>
        </div>
    );
}

export default PagContacto;
