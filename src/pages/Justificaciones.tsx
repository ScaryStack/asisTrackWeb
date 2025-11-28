import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";
import { Card } from "../components/shared/Card";
import "../Styles/Justificaciones.css";
import "../global.css"

export const Justificaciones = () => {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const [horaActual, setHoraActual] = useState("");
  const [fecha, setFecha] = useState("");
  const [motivo, setMotivo] = useState("");

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
    
    actualizarHora();
    const interval = setInterval(actualizarHora, 1000);
    
    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    // Establecer fecha actual
    const ahora = new Date();
    const dia = ahora.getDate().toString().padStart(2, '0');
    const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
    const anio = ahora.getFullYear();
    setFecha(`${dia}/${mes}/${anio}`);
  }, []);

  const getTitulo = () => {
    switch(tipo) {
      case 'inasistencia': return 'Inasistencia';
      case 'atraso': return 'Atraso';
      default: return 'Justificación';
    }
  };

  const handleEnviar = () => {
    console.log({ tipo, fecha, horaActual, motivo });
  };

  return (
    <>
      <Navbar/> 
      <div className="justificaciones-container">
        <h1 className="justificaciones-logo">{getTitulo()}</h1>
        
        <Card>
          <div className="card-content">
            {/* Hora */}
            <div className="form-group">
              <label className="form-label">Hora</label>
              <div className="time-display">{horaActual}</div>
            </div>

            <div className="separator"></div>

            {/* Fecha */}
            <div className="form-group">
              <label className="form-label">Fecha</label>
              <div className="date-display">{fecha}</div>
            </div>

            <div className="separator"></div>

            {/* Mensaje */}
            <div className="form-group">
              <label className="form-label">Mensaje</label>
              <textarea 
                className="motivo-textarea"
                placeholder="Escribe Motivo acá"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows={4}
              />
            </div>

            <div className="separator"></div>

            {/* Botones */}
            <div className="form-buttons">
              <button className="submit-button" onClick={handleEnviar}>
                Enviar
              </button>
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