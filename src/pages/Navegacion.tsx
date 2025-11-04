
import { Navbar } from "../components/shared/Navbar";
import { Card } from "../components/shared/Card";


export const Navegacion = () => {
  return (
    <>
      <Navbar/> 
      <div className="container">
        <h1 className="logo">Navegación</h1>
        <h3>Incidencias</h3>

        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "15px" }}>
          <button>Fuerza Mayor</button>
          <button>Trayecto</button>
        </div>

        <Card>
          <button style={{ width: "100%", marginTop: "10px" }}>Justificaciones</button>
          <button style={{ width: "100%", marginTop: "10px" }}>Solicitudes</button>
        </Card>
      </div>
    </>
  );
};
