import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaCertificate,
  FaHistory,
  FaListAlt,
  FaAddressBook,
  FaInfoCircle,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { FaBars } from "react-icons/fa";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const navigate = useNavigate();

  // Inicializa el tema desde localStorage
  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-bs-theme", savedTheme);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const handleProfile = () => {
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

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
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

            <div className="menu-separator"></div>

            {/* Sección Configuración */}
            <div className="menu-section">
              <div className="menu-section-title">Configuración</div>

              <div className="menu-item toggle-theme">
                <span className="switch-label">Modo Oscuro</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={theme === "dark"}
                    onChange={handleThemeToggle}
                  />
                  <span className="slider round">
                    {theme === "dark" ? <FaMoon /> : <FaSun />}
                  </span>
                </label>
              </div>

              <button className="menu-item" onClick={handleContacto}>
                <FaAddressBook className="menu-icon" />
                Contacto
              </button>
            </div>

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
