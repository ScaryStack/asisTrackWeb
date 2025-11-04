

import { useState } from "react";
import { InfoList } from "./InfoList";
import "../../Styles/InfoButton.css";

export const InfoButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="info-button-container">
      <button 
        className="info-button"
        onClick={toggleMenu}
      >
        ❗
      </button>
      
      {isOpen && (
        <div className="info-list-overlay" onClick={handleClose}>
          <div className="info-list-wrapper" onClick={(e) => e.stopPropagation()}>
            <InfoList />
          </div>
        </div>
      )}
    </div>
  );
};