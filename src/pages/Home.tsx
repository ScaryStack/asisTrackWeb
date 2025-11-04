import { useEffect, useState } from "react";
import { Navbar } from "../components/shared/Navbar";
import { Card } from "../components/shared/Card";
import { InfoButton } from "../components/shared/InfoButton"; 
import { NavigationButton } from "../components/shared/NavigationButton";


export const Home = () => {
  const [hora, setHora] = useState("");
  const [fecha, setFecha] = useState("");
  const [nombre, setNombre] = useState("Usuario");

  useEffect(() => {
    const user = localStorage.getItem("usuario") || "Usuario";
    setNombre(user);

    const now = new Date();
    setFecha(now.toLocaleDateString());
    setHora(now.toLocaleTimeString());

    const interval = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const horas = new Date().getHours();
  const momento = horas < 12 ? "día" : horas < 18 ? "tarde" : "noche";

  const handleMarcar = () => alert("✅ Asistencia marcada correctamente");

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="logo">AsisTrack</h1>
        <p>Buen {momento}, {nombre}. Bienvenido a AsisTrack.</p>
        <h2>{hora}</h2>

        <Card title="Registrar asistencia">
          <p>Ubicación lugar de trabajo</p>
          <p>Día actual: {fecha}</p>
          <button onClick={handleMarcar}>Marcar asistencia</button>
        </Card>
      </div>

      <InfoButton />

      <NavigationButton />
    </>
  );
};
