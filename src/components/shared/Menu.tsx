import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaCertificate,FaHistory, FaListAlt, FaCog, FaAddressBook, FaInfoCircle } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const handleProfile = () => {
    //Cierra| el menú y navega al perfil
    setIsOpen(false);
    navigate("/perfil"); 
  };

  const handleCertificado = () => {
    setIsOpen(false);
    navigate("/mis-certificados");
  };

  const handleMarcaciones = () => {
    setIsOpen(false);
    navigate("/mis-marcaciones");
  };

  const handleSolicitudes = () => {
    setIsOpen(false);
    navigate("/mis-solicitudes");
  };

  const handleConfiguracion = () => {
    setIsOpen(false);
    console.log("Configuración clickeada");
  };

  const handleContacto = () => {
    setIsOpen(false);
    navigate("/contacto");
  };

  const handleAcercaDe = () => {
    setIsOpen(false);
    navigate("/acerca-de");
  };

  return (
    <div className="menu-container">
      <button className="menu-button" onClick={toggleMenu}>
        <FaBars size={20} />
      </button>
      
      {isOpen && (
        <div className="menu-overlay" onClick={() => setIsOpen(false)}>
          <div className="menu-content" onClick={(e) => e.stopPropagation()}>

            {/* Sección Menu */}
            <div className="menu-section">
              <div className="menu-section-title">Menu</div>
              <button className="menu-item" onClick={handleProfile}>
                <FaUser className="menu-icon" />
                Perfil
              </button>
              <button className="menu-item" onClick={handleCertificado}>
                <FaCertificate className="menu-icon" />
                Certificado
              </button>
               <button className="menu-item" onClick={handleMarcaciones}>
                <FaHistory className="menu-icon" />
                Mis Marcaciones
              </button>
              <button className="menu-item" onClick={handleSolicitudes}>
                <FaListAlt className="menu-icon" />
                Mis Solicitudes
              </button>
            </div>

            {/* Separador */}
            <div className="menu-separator"></div>

            {/* Sección Configuración */}
            <div className="menu-section">
              <div className="menu-section-title">Configuración</div>
              <button className="menu-item" onClick={handleConfiguracion}>
                <FaCog className="menu-icon" />
                Modo Oscuro
              </button>
              <button className="menu-item" onClick={handleContacto}>
                <FaAddressBook className="menu-icon" />
                Contacto
              </button>
            </div>

            {/* Separador */}
            <div className="menu-separator"></div>

            {/* Sección inferior */}
            <div className="menu-section">
              <button className="menu-item" onClick={handleAcercaDe}>
                <FaInfoCircle className="menu-icon" />
                Acerca de
              </button>
              <button className="menu-item logout" onClick={handleLogout}>
                <FaSignOutAlt className="menu-icon" />
                Cerrar Sesión
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};