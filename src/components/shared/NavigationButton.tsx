

import { useNavigate } from "react-router-dom";
import "../../Styles/NavigationButton.css";

export const NavigationButton = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/navegacion"); // Redirecciona directamente a la página de navegación
  };

  return (
    <div className="navigation-button-container">
      <button 
        className="navigation-button"
        onClick={handleNavigation}
      >
        +
      </button>
    </div>
  );
};