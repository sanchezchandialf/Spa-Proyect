import React, { useState } from 'react';
import ConsultarTurnosSection from '../Turnos/componentes/TurnosSection';
import ConsultasSection from '../Profesional/Components/ConsultasSection';
import EmpleoListWithPostulaciones from '../Profesional/Components/EmpleoListWithPostulaciones';
import Factura from '../pagos/utilidades/Factura';
import CrearTurnoVacio from '../Turnos/componentes/CrearTurnoVacio';
import { useAuth } from '../context/AuthContext';


export default function Menu() {

    const [selectedOption, setSelectedOption] = useState('Todos los clientes');
    const [isClientesOpen, setIsClientesOpen] = useState(false);
    const [isInformesOpen, setIsInformesOpen] = useState(false);

    const { admin_profesional, admin_secretaria, esAdmin } = useAuth();

    const renderComponent = () => {
        switch (selectedOption) {
        case 'Todos los clientes':
            return <h1>Listado de todos los clientes</h1>;
        case 'Clientes por profesional':
            return <h1>Clientes por profesional</h1>;
        case 'Consultas':
            return <ConsultasSection/>;
        case 'Turnos':
            return <ConsultarTurnosSection/>;
        case 'Agregar turnos':
            return <CrearTurnoVacio/>;
        case 'Pagos':
            return <Factura/>;
        case 'Ingresos':
            return <h1>Informe de ingresos por fechas</h1>;
        case 'Servicios por profesional':
            return <h1>Informe de servicios realizados</h1>;
        case 'Solicitudes de empleo':
            return <EmpleoListWithPostulaciones/>;
        default:
            return <h1>Selecciona una opción</h1>;
        }
    };

    return (
        <div className="flex min-h-screen">
          <aside className="w-64 bg-[#344C3D] text-[#f4f3f1] relative overflow-y-auto">
          
            <nav className="p-4">
              {/* Clientes Section */}
              <button 
                onClick={() => setIsClientesOpen(!isClientesOpen)} 
                className="w-full text-left p-2 bg-[#829672] hover:bg-[#344C3D] m-1"
              >
                Clientes
              </button>
              
              {isClientesOpen && (
                <div className="ml-4">
                  <button 
                    onClick={() => setSelectedOption('Todos los clientes')} 
                    className="w-full text-left p-2 bg-[#D8959B] hover:bg-[#f2d1d4] m-1"
                  >
                    Todos los clientes
                  </button>
                  {esAdmin() && (
                    <button 
                    onClick={() => setSelectedOption('Clientes por profesional')} 
                    className="w-full text-left p-2 bg-[#D8959B] hover:bg-[#f2d1d4] m-1"
                  >
                    Clientes por profesional
                  </button>
                  )}
                </div>
              )}
    
              {/* Other Sections */}
              {admin_profesional() && (
                <button 
                onClick={() => setSelectedOption('Consultas')} 
                className="w-full text-left p-2 bg-[#829672] hover:bg-[#344C3D] m-1"
              >
                Consultas
              </button>
              )}

              {admin_profesional() && (
                <button 
                onClick={() => setSelectedOption('Turnos')} 
                className="w-full text-left p-2 bg-[#829672] hover:bg-[#344C3D] m-1"
              >
                Turnos
              </button>
              )}

              {admin_profesional() && (
                <button 
                onClick={() => setSelectedOption('Agregar turnos')} 
                className="w-full text-left p-2 bg-[#829672] hover:bg-[#344C3D] m-1"
              >
                Agregar turnos
              </button>
              )}
              
              {admin_secretaria() && (
                <button 
                onClick={() => setSelectedOption('Pagos')} 
                className="w-full text-left p-2 bg-[#829672] hover:bg-[#344C3D] m-1"
              >
                Pagos
              </button>
              )}

              {esAdmin() && (
                <button 
                onClick={() => setSelectedOption('Solicitudes de empleo')} 
                className="w-full text-left p-2 bg-[#829672] hover:bg-[#344C3D] m-1"
              >
                Solicitudes de empleo
              </button>
              )}
    
              {/* Ingresos Section */}
              {admin_secretaria() && (
                <button 
                onClick={() => setIsInformesOpen(!isInformesOpen)} 
                className="w-full text-left p-2 bg-[#829672] hover:bg-[#344C3D] m-1"
              >
                Informes
              </button>
              )}
              
              {isInformesOpen && (
                <div className="ml-4">
                  <button 
                    onClick={() => setSelectedOption('Ingresos')} 
                    className="w-full text-left p-2 bg-[#D8959B] hover:bg-[#f2d1d4] m-1"
                  >
                    Ingresos
                  </button>
                  {esAdmin() && (
                    <button 
                    onClick={() => setSelectedOption('Servicios por profesional')} 
                    className="w-full text-left p-2 bg-[#D8959B] hover:bg-[#f2d1d4] m-1 "
                  >
                    Servicios por profesional
                  </button>
                  )}
                  
                </div>
              )}
            </nav>
          </aside>
    
          <div className="flex-1 p-4">
            {renderComponent()}
          </div>
        </div>
      );
}
