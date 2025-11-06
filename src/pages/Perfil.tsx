import { useRef, useState } from "react";
import "../Styles/Perfil.css";
import { NavigationButton } from "../components/shared/NavigationButton";
import { InfoButton } from "../components/shared/InfoButton";
import { Navbar } from "../components/shared/Navbar";


export const Perfil = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [foto, setFoto] = useState<string | null>(null);

  const handleFotoClick = () => {
     fileInputRef.current?.click();
  };

  const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
        reader.onloadend = (e) => {
            setFoto(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    }   
    };


  return (
    <>
    <Navbar />
    <div>
       <div className="perfil-header">
         <h1>Perfil del Usuario</h1>
       </div>

        <div className="perfil-layout">
        {/* Cuadro para foto a la izquierda */}
        <div className="foto-container">
          <div className="foto-placeholder" onClick={handleFotoClick}>{foto ? (
            <img src={foto} alt="Foto de Perfil" className="foto-preview" />
          ) : (
            <span>Subir imagen</span>
            )}
          </div>
          <input 
          type="file" 
            ref={fileInputRef}
            className="foto-input" 
            accept="image/*" 
            style={{ display: 'none' }}
            onChange={handleFotoChange}
          />
        </div>

        {/* Información de Contacto */}
        <div className="perfil-content">
        <div className="perfil-section">
          <h2>Información de Contacto</h2>
          <div className="perfil-info">
            <div className="info-item">
              <label>Nombre Trabajador:</label>
              <span>Juan Jose</span>
            </div>
            <div className="info-item">
              <label>Dirección Particular:</label>
              <span>Avenida miraflores, Renca 7942</span>
            </div>
            <div className="info-item">
              <label>Teléfono Personal:</label>
              <span>8888888888</span>
            </div>
          </div>
        </div>

        {/* Información Laboral */}
        <div className="perfil-section">
          <h2>Trabajo</h2>
          <div className="perfil-info">
            <div className="info-item">
              <label>Teléfono Empresa:</label>
              <span>9999999999</span>
            </div>
            <div className="info-item">
              <label>Dirección de Trabajo:</label>
              <span>Santa Elena, huechuraba 102</span>
            </div>
            <div className="info-item"> 
              <label>Cargo:</label>
              <span>Soporte Tecnico</span>
            </div>
          </div>
        </div>
      </div>
    </div>  
    </div>
    <InfoButton />
    
    <NavigationButton />
    </>
  );
};