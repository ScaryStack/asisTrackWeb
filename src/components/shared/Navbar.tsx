import { NavLink } from "react-router-dom";
import { Menu } from "./Menu";
import "../../global.css";



export const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>🏠</NavLink>
      <Menu />
    </nav>
  );
};
