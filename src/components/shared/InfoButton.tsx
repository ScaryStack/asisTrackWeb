

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoList } from "./InfoList";
import "../../Styles/InfoButton.css";


export const InfoButton = () => {
 const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  /* menu abierto/cerrado */ 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  /* cerrar menu*/ 
  const handleClose = () => {
    setIsOpen(false);
  };

  /* ir a navegacion */
  const handleNavigation = () => {
    navigate("/navegacion");
  };

return (
  <>
        {/*Boton Informacion*/}
    <div className="info-button-container">
      <button 
        className="info-button"
        onClick={toggleMenu}
      >
        ❗
      </button>
    </div>
      
      {/*Boton Navegacion*/}
    <div className="navigation-button-container">
        <button 
          className="navigation-button"
          onClick={handleNavigation}
        >
          +
        </button>
    </div>


      {/* Menú desplegable */}
      {isOpen && (
        <div className="info-list-overlay" onClick={handleClose}>
          <div className="info-list-wrapper" onClick={(e) => e.stopPropagation()}>
            <InfoList />
          </div>
        </div>
      )}
    </>
  );
};