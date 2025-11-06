
import { Navbar } from "../components/shared/Navbar";
import { Card } from "../components/shared/Card";
import "../Styles/Navegacion.css";



export const Navegacion = () => {
  return (
    <>
      <Navbar/> 
      <div className="navegacion-container">
        <h1 className="navegacion-logo">Navegación</h1>

        
        <Card>
          <h3 style={{ 
            marginBottom: "20px",
             color: "#ffffffff",
             textAlign: "center",
             width: "100%" }}>Incidencias</h3>
          
         <div className="buttons-row">
            <button className="nav-button">Fuerza Mayor</button>
            <button className="nav-button">Trayecto</button>
          </div>

          <div className="buttons-column">
            <button className="nav-button full-width">Justificaciones</button>
            <button className="nav-button full-width">Solicitudes</button>
          </div>
        </Card>
      </div>
    </>
  );
};
