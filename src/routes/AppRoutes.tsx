import { useRoutes, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Info } from "../pages/Info";
import { Navegacion } from "../pages/Navegacion";

export const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/home", element: <Home /> },
    { path: "/info", element: <Info /> },
    { path: "/navegacion", element: <Navegacion /> },
    { path: "*", element: <Navigate to="/" /> },
  ]);

  return routes;
};
