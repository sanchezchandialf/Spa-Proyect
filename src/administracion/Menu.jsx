import React, { useState, useEffect } from 'react';
import ConsultarTurnosSection from '../Turnos/componentes/TurnosSection';
import ConsultasSection from '../Profesional/Components/ConsultasSection';
import EmpleoListWithPostulaciones from '../Profesional/Components/EmpleoListWithPostulaciones';
import CrearTurnoVacio from '../Turnos/componentes/CrearTurnoVacio';
import { useAuth } from '../context/AuthContext';

import ClientesPorProfesional from '../Components/ui/ClientesPorProfesional';


import InformeIngresos from '../Components/ui/InformeIngresos';
import InformeServicios from '../Components/InformeServicios';
import PagosPorCliente from '../Components/PagosPorCliente';
import ListadoClientes from '../Components/ui/ListadoClientes';
export default function Menu() {

    const [selectedOption, setSelectedOption] = useState('Bienvenida');
    const [isClientesOpen, setIsClientesOpen] = useState(false);
    const [isInformesOpen, setIsInformesOpen] = useState(false);

    const { admin_profesional, admin_secretaria, esAdmin } = useAuth();

    // Verifica que estas funciones estén devolviendo los valores correctos
    console.log('Es admin profesional:', admin_profesional());
    console.log('Es admin secretaria:', admin_secretaria());
    console.log('Es admin:', esAdmin());

    const renderComponent = () => {
        switch (selectedOption) {
        case 'Bienvenida':
          return <h1>Bienvenido al sistema de gestión de la administrativa</h1>;
        case 'Todos los clientes':
            return <ListadoClientes />;
        case 'Clientes por profesional':
            return <ClientesPorProfesional />;
        case 'Consultas':
            return <ConsultasSection/>;
        case 'Turnos':
            return <ConsultarTurnosSection/>;
        case 'Agregar turnos':
            return <CrearTurnoVacio/>;
        case 'Pagos':
            return <PagosPorCliente/>;
        case 'Ingresos':
            return <InformeIngresos />;
        case 'Servicios por profesional':
            return <InformeServicios/>;
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
