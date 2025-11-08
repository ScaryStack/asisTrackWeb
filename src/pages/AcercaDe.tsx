import { Navbar } from "../components/shared/Navbar";
import "../Styles/AcercaDe.css";

export const AcercaDe = () => {
  return (
    <>
      <Navbar /> 
      <div className="AcercaDe-container">
        <h1 className="AcercaDe-titulo">Acerca de</h1>
        <p className="AcercaDe-mensaje">Página en construcción...</p>
      </div>
    </>
  );
};