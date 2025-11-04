import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="menu-container">
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>
      
      {isOpen && (
        <div className="menu-overlay" onClick={() => setIsOpen(false)}>
          <div className="menu-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="menu-item logout"
              onClick={handleLogout}
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};