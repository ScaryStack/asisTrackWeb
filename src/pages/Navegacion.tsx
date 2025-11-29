
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "../components/shared/Navbar";
import { Card } from "../components/shared/Card";
import "../Styles/Navegacion.css";
import "../global.css"



export const Navegacion = () => {
  const navigate = useNavigate();
  const [justificacionesOpen, setJustificacionesOpen] = useState(false);
  const [solicitudesOpen, setSolicitudesOpen] = useState(false);


  return (
    <>
      <Navbar/> 
      <div className="navegacion-container">
        <h1 className="navegacion-logo">Navegación</h1>

       {/* Card Incidencias */}
        <Card>
          <h3 className="card-title">
           Incidencias </h3> 
          
          <div className="buttons-row">
            <button 
            className="nav-button"
            onClick={() => navigate("/incidencia/fuerza-mayor")}
            >
              Fuerza Mayor
            </button>
            <button className="nav-button"
            onClick={() => navigate("/incidencia/trayecto")}
            >
              Trayecto
            </button>
          </div>
        </Card>


        {/* Card Justificaciones y Solicitudes */}
        <Card>
          <div className="buttons-column">
            {/* Botón Justificaciones con menú desplegable */}
            <div className="dropdown-container">
              <button className="nav-button full-width dropdown-button"
              onClick={() => setJustificacionesOpen (!justificacionesOpen)}
              >
              Justificaciones
                <span className={`dropdown-arrow ${justificacionesOpen ? 'open' : ''}`}>
                  
                ▼
                </span>
              </button>

              {justificacionesOpen && (
                <div className="dropdown-menu">
                  <button className="dropdown-item"
                  onClick={() => navigate("/justificacion/atraso")}
                  >
                    Atraso 
                  </button>

                  <button className="dropdown-item"
                  onClick={() => navigate ("/justificacion/inasistencia")}
                  >
                    Inasistencia 
                  </button>
                </div>
              )}
            </div>

            {/* Botón Solicitudes con menú desplegable */}
            <div className="dropdown-container">
              <button 
                className="nav-button full-width dropdown-button"
                onClick={() => setSolicitudesOpen(!solicitudesOpen)}
              >
                Solicitudes
                <span className={`dropdown-arrow ${solicitudesOpen ? 'open' : ''}`}>
                  ▼
                </span>
              </button>

              {solicitudesOpen && (
                <div className="dropdown-menu">
                  <button className="dropdown-item"
                  onClick={() => navigate ("/solicitud/vacaciones")}
                  >
                    Vacaciones 
                  </button>

                  <button className="dropdown-item"
                  onClick={() => navigate ("/solicitud/permiso-salida")}
                  >
                    Permiso de Salida 
                  </button>
                  </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
