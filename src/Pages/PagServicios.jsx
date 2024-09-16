import Header2 from "../Components/Header2";
import ComentariosSection from "../Components/ui/ComentarioSeccion";
import SpaServices from "../Components/ui/SpaServices";
import SolicitarTurno from '../Components/ui/SolicitarTurno'


function PagServicios() {
    return (
      <div className="flex flex-col w-full">
        
        <main className="w-full flex-1"> {/* Removí paddings aquí */}
          <SpaServices />
          <SolicitarTurno/>
        </main>
        <ComentariosSection />
      </div>
    );
}

export default PagServicios;
