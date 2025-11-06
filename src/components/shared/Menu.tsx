import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa"; /*Icono de menu */
import "../../Styles/Menu.css";


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
    // Cierra el menú y navega al perfil
    setIsOpen(false);
    navigate("/perfil"); 
  };

  return (
    <div className="menu-container">
      <button className="menu-button" onClick={toggleMenu}>
        <FaBars size={20} /> {/*Icono de Menu*/}
      </button>
      
      {isOpen && (
        <div className="menu-overlay" onClick={() => setIsOpen(false)}>
          <div className="menu-content" onClick={(e) => e.stopPropagation()}>

            {/* Boton Perfil y icono */}
            <button 
              className="menu-item profile"
              onClick={handleProfile}
            >
             <FaUser className="menu-icon" />
              Perfil
            </button> 

            {/* Boton cerrar Sesión y icono */}
            <button 
              className="menu-item logout"
              onClick={handleLogout}
            >
             <FaSignOutAlt className="menu-icon" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};