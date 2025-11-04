import { useRoutes, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Navegacion } from "../pages/Navegacion";
import { RegistrarAsistencia } from "../pages/RegistrarAsistencia"; 


export const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/home", element: <Home /> },
    { path: "/navegacion", element: <Navegacion /> },
     { path: "/registrar-asistencia", element: <RegistrarAsistencia /> },
    { path: "*", element: <Navigate to="/" /> },
  ]);

  return routes;
};
