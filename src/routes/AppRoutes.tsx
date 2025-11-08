import { useRoutes, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Navegacion } from "../pages/Navegacion";
import { RegistrarAsistencia } from "../pages/RegistrarAsistencia"; 
import { Perfil } from "../pages/Perfil";
import { Incidencia } from "../pages/Incidencia";
import { Justificaciones } from "../pages/Justificaciones";
import { Solicitudes } from "../pages/Solicitudes";
import { MisSolicitudes } from "../pages/MisSolicitudes";
import { MisCertificados } from "../pages/MisCertificados";
import { Contacto } from "../pages/Contacto";
import { AcercaDe } from "../pages/AcercaDe";
import { MisMarcaciones } from "../pages/MisMarcaciones";


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
    {path: "/mis-solicitudes", element: <MisSolicitudes />},
    {path: "/mis-certificados", element: <MisCertificados />},
    {path: "/contacto", element: <Contacto />},
    {path: "/acerca-de", element: <AcercaDe />},
    {path: "/mis-marcaciones", element: <MisMarcaciones />},
    { path: "*", element: <Navigate to="/" /> },
  ]);

  return routes;
};
