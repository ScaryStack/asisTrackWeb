import { NavLink, useNavigate } from "react-router-dom";
import "../../global.css";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>🏠</NavLink>
      <NavLink to="/info" className={({ isActive }) => (isActive ? "active" : "")}>❓</NavLink>
      <NavLink to="/navegacion" className={({ isActive }) => (isActive ? "active" : "")}>☰</NavLink>
      <button onClick={handleLogout} style={{ background: "none", border: "none", color: "#aaa", fontSize: "1.2rem" }}>🚪</button>
    </nav>
  );
};
