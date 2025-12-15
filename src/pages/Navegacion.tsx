
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";
import { Card } from "../components/shared/Card";
import "../Styles/Navegacion.css";
import "../global.css"



export const Navegacion = () => {
  const navigate = useNavigate();
  


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


        {/* Card Justificaciones */}
        <Card>
           <h3 className="card-title">
           Justificaciones </h3> 
          
          <div className="buttons-row">
            <button 
            className="nav-button"
            onClick={() => navigate("/justificacion/atraso")}
            >
              Atraso
            </button>
            <button className="nav-button"
            onClick={() => navigate("/justificacion/inasistencia")}
            >
              Inasistencia
            </button>
          </div>
          
        </Card>

        
        {/* Card Solicitudes */}
        <Card>
          <h3 className="card-title">
           Solicitudes </h3> 
          
          <div className="buttons-row">
            <button 
            className="nav-button"
            onClick={() => navigate("/solicitud/vacaciones")}
            >
              Vacaciones
            </button>
            <button className="nav-button"
            onClick={() => navigate("/solicitud/permiso-salida")}
            >
              Permiso de Salida
            </button>
          </div>
          
        </Card> 
      </div>
    </>
  );
};
