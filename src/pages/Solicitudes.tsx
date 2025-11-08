

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";
import { Card } from "../components/shared/Card";
import "../Styles/Solicitudes.css";

export const Solicitudes = () => {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const [horaActual, setHoraActual] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
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

  const getTitulo = () => {
    switch(tipo) {
      case 'vacaciones': return 'Vacaciones';
      case 'permiso-salida': return 'Permiso de Salida';
      default: return 'Solicitud';
    }
  };

  const handleEnviar = () => {
    const nuevaSolicitud = {
    id: Date.now(), // ID único basado en timestamp
    tipo: tipo as 'vacaciones' | 'permiso-salida',
    fechaInicio,
    fechaFin: tipo === 'vacaciones' ? fechaFin : undefined,
    hora: horaActual,
    motivo,
    estado: 'pendiente', // Por defecto pendiente
    fechaSolicitud: new Date().toISOString().split('T')[0]
  };

   // Obtener solicitudes existentes
  const solicitudesExistentes = JSON.parse(localStorage.getItem('misSolicitudes') || '[]');
  
  // Agregar nueva solicitud
  const nuevasSolicitudes = [...solicitudesExistentes, nuevaSolicitud];
  
  // Guardar en localStorage
  localStorage.setItem('misSolicitudes', JSON.stringify(nuevasSolicitudes));
  
  // Redirigir a Mis Solicitudes
  navigate('/mis-solicitudes');
};


  return (
    <>
      <Navbar/> 
      <div className="solicitudes-container">
        <h1 className="solicitudes-logo">{getTitulo()}</h1>
        
        <Card>
          <div className="card-content">
            {/* Fecha Inicio */}
            <div className="form-group">
              <label className="form-label">Fecha Inicio</label>
              <input 
                type="date"
                className="date-input"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>

            {/* Solo mostrar Fecha Fin para Vacaciones */}
            {tipo === 'vacaciones' && (
              <>
                <div className="separator"></div>
                <div className="form-group">
                  <label className="form-label">Fecha Fin</label>
                  <input 
                    type="date"
                    className="date-input"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="separator"></div>

            {/* Hora */}
            <div className="form-group">
              <label className="form-label">Hora</label>
              <div className="time-display">{horaActual}</div>
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