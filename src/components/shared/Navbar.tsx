import { NavLink } from "react-router-dom";
import { Menu } from "./Menu";
import { FaHome } from "react-icons/fa"; /*import de iconos*/ 


export const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
      <FaHome size={24} /> {/*Icono de Home*/}
      </NavLink>
      <Menu />
    </nav>
  );
};
