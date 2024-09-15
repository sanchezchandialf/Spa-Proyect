import ConsultaForm from "../Components/ui/ConsultaForm";
import EmpleoList from "../Components/ui/EmpleoList";

function PagContacto() {
  return (
    <div className="min-h-screen bg-[#c5dce3] text-white">
      {/* Sección del Formulario de Consulta */}
      <div className=" w-full">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">Formulario de Consulta</h2>
        <div className="w-full">
          <ConsultaForm />
        </div>
      </div>

      {/* Sección de la Lista de Empleos */}
      <div className=" w-full">
        <div className="w-full">
          <EmpleoList />
        </div>
      </div>
    </div>
  );
}

export default PagContacto;