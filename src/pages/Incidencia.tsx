import { useParams, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "../components/shared/Navbar";
import { Card } from "../components/shared/Card";
import "../Styles/Incidencia.css";
import "../global.css"

export const Incidencia = () => {
  const { tipo } = useParams(); 
  const navigate = useNavigate();
  const [horaActual, setHoraActual] = useState("");
  const [Fecha, setFecha] = useState("");

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
      navigate("/");
    }


// Actualizar hora cada segundo
    const actualizarHora = () => {
      const ahora = new Date();
      const hora = ahora.getHours().toString().padStart(2, '0');
      const minutos = ahora.getMinutes().toString().padStart(2, '0');
      const segundos = ahora.getSeconds().toString().padStart(2, '0');
      setHoraActual(`${hora}:${minutos}:${segundos}`);
    };
    
    actualizarHora(); // Actualizar inmediatamente
    const interval = setInterval(actualizarHora, 1000);
    
    return () => clearInterval(interval); // Limpiar intervalo 
  }, [navigate]);


  const getTitulo = () => {
    switch(tipo) {
      case 'fuerza-mayor': return 'Fuerza Mayor';
      case 'trayecto': return 'Trayecto';
      default: return 'Incidencia';
    }
  };

  return (
    <>
      <Navbar/> 
      <div className="incidencia-container">
        <h1 className="incidencia-logo">{getTitulo()}</h1>
        
        <Card>
        <div className="card-content">
          <div className="form-group">
            <label>Fecha</label>
            <input 
            type="Date" 
            value={Fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="date-input"
            />
          </div>

          <div className="form-group">
            <label>Hora</label>
            <input type="text"
            value={horaActual}
            placeholder="HH:MM:SS" 
            />
          </div>

          <div className="form-group">
            <label>Mensaje</label>
            <textarea placeholder="Escribe Motivo acá" rows={4}></textarea>
          </div>

          <div className="form-buttons">
            <button className="submit-button">Enviar</button>
            <button className="cancel-button" onClick={() => navigate("/navegacion")}>
              Cancelar
            </button>
          </div>
        </div>
        </Card>
      </div>
    </>
  );
};