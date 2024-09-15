import ConsultasSection from "../Components/ui/ConsultasSection";
import EmpleoListWithPostulaciones from "../Components/ui/EmpleoListWithPostulaciones";

function PagProfesional() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6"> {/* Fondo general con color gris claro */}
           
                <h1 className="text-4xl font-semibold mb-6 text-gray-800  text-center mt-8">Página Profesional</h1> {/* Margen inferior ajustado */}
                <div className="space-y-4"> {/* Espaciado reducido entre secciones */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <ConsultasSection />
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <EmpleoListWithPostulaciones />
                    </div>
                </div>
            
        </div>
    );
}

export default PagProfesional;
