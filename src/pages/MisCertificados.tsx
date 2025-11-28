import { Navbar } from "../components/shared/Navbar";
import "../Styles/MisCertificados.css";
import "../global.css"

export const MisCertificados = () => {
  return (
    <>
      <Navbar /> 
      <div className="mis-certificados-container">
        <h1 className="mis-certificados-titulo">Mis Certificados</h1>
        <p className="mis-certificados-mensaje">Página en construcción...</p>
      </div>
    </>
  );
};