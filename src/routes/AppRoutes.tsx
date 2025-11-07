import { useRoutes, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Navegacion } from "../pages/Navegacion";
import { RegistrarAsistencia } from "../pages/RegistrarAsistencia"; 
import { Perfil } from "../pages/Perfil";
import { Incidencia } from "../pages/Incidencia";
import { Justificaciones } from "../pages/Justificaciones";
import { Solicitudes } from "../pages/Solicitudes";


export const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/home", element: <Home /> },
    { path: "/navegacion", element: <Navegacion /> },
    { path: "/registrar-asistencia", element: <RegistrarAsistencia /> },
    { path: "/perfil", element: <Perfil/> },
    { path: "/incidencia/:tipo", element: <Incidencia /> },
    { path: "/justificacion/:tipo", element: <Justificaciones />},
    {path: "/solicitud/:tipo", element: <Solicitudes />},
    { path: "*", element: <Navigate to="/" /> },
  ]);

  return routes;
};
