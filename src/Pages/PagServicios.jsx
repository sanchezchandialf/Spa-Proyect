import Header2 from "../Components/Header2";
import ComentariosSection from "../Components/ui/ComentarioSeccion";
import SpaServices from "../Components/ui/SpaServices";

function PagServicios() {
    return (
      <div className="flex flex-col w-full">
        <Header2 />
        <main className="w-full flex-1"> {/* Removí paddings aquí */}
          <SpaServices />
        </main>
        <ComentariosSection />
      </div>
    );
}

export default PagServicios;
