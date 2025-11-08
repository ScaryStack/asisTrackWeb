  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { Navbar } from "../components/shared/Navbar";
  import { Card } from "../components/shared/Card";
  import "../Styles/MisSolicitudes.css";

  
  type TipoSolicitud = 'vacaciones' | 'permiso-salida';
  type EstadoSolicitud = 'pendiente' | 'aprobado' | 'rechazado';

  interface Solicitud {
    id: number;
    tipo: TipoSolicitud;
    fechaInicio: string;
    fechaFin?: string;
    hora: string;
    motivo: string;
    estado: EstadoSolicitud;
    fechaSolicitud: string;
  }

  export const MisSolicitudes = () => {
    const navigate = useNavigate();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

    useEffect(() => {
      const usuario = localStorage.getItem("usuario");
      console.log("Usuario en localStorage:", usuario); 
      
      if (!usuario) {
        console.log("No hay usuario, redirigiendo a /"); 
        navigate("/");
        return;
      }

      // Cargar solicitudes desde localStorage
      const solicitudesGuardadas = localStorage.getItem('misSolicitudes');
      if (solicitudesGuardadas) {
        try {
          const parsed = JSON.parse(solicitudesGuardadas);
          setSolicitudes(parsed);
        } catch (error) {
          console.error('Error parsing solicitudes:', error);
          setSolicitudes([]);
        }
      }
    }, [navigate]);

    const solicitudesVacaciones = solicitudes.filter((s: Solicitud) => s.tipo === 'vacaciones');
    const solicitudesPermiso = solicitudes.filter((s: Solicitud) => s.tipo === 'permiso-salida');

    const getEstadoColor = (estado: string): string => {
      switch(estado) {
        case 'aprobado': return '#10b981';
        case 'rechazado': return '#ef4444';
        default: return '#f59e0b';
      }
    };

    const getEstadoTexto = (estado: string): string => {
      switch(estado) {
        case 'aprobado': return 'Aprobado';
        case 'rechazado': return 'Rechazado';
        default: return 'Pendiente';
      }
    };

    const formatFecha = (fecha: string): string => {
      return new Date(fecha).toLocaleDateString('es-ES');
    };

    return (
      <>
        <Navbar /> 
        <div className="mis-solicitudes-container">
          <h1 className="mis-solicitudes-titulo">Mis Solicitudes</h1>
          
          {/* Card de Vacaciones */}
          <Card>
            <div className="solicitudes-card">
              <h2 className="solicitudes-subtitulo">Vacaciones</h2>
              {solicitudesVacaciones.length === 0 ? (
                <p className="sin-solicitudes">No hay solicitudes de vacaciones</p>
              ) : (
                <div className="solicitudes-lista">
                  {solicitudesVacaciones.map((solicitud: Solicitud) => (
                    <div key={solicitud.id} className="solicitud-item">
                      <div className="solicitud-info">
                        <div className="solicitud-fechas">
                          <span>{formatFecha(solicitud.fechaInicio)}</span>
                          {solicitud.fechaFin && (
                            <>
                              <span className="separador-fechas">→</span>
                              <span>{formatFecha(solicitud.fechaFin)}</span>
                            </>
                          )}
                        </div>
                        <div className="solicitud-motivo">{solicitud.motivo}</div>
                        <div className="solicitud-fecha-solicitud">
                          Solicitado: {formatFecha(solicitud.fechaSolicitud)}
                        </div>
                      </div>
                      <div 
                        className="solicitud-estado"
                        style={{ backgroundColor: getEstadoColor(solicitud.estado) }}
                      >
                        {getEstadoTexto(solicitud.estado)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Card de Permiso de Salida */}
          <Card>
            <div className="solicitudes-card">
              <h2 className="solicitudes-subtitulo">Permiso de Salida</h2>
              {solicitudesPermiso.length === 0 ? (
                <p className="sin-solicitudes">No hay solicitudes de permiso de salida</p>
              ) : (
                <div className="solicitudes-lista">
                  {solicitudesPermiso.map((solicitud: Solicitud) => (
                    <div key={solicitud.id} className="solicitud-item">
                      <div className="solicitud-info">
                        <div className="solicitud-fechas">
                          <span>{formatFecha(solicitud.fechaInicio)}</span>
                          <span className="solicitud-hora">a las {solicitud.hora.slice(0,5)}</span>
                        </div>
                        <div className="solicitud-motivo">{solicitud.motivo}</div>
                        <div className="solicitud-fecha-solicitud">
                          Solicitado: {formatFecha(solicitud.fechaSolicitud)}
                        </div>
                      </div>
                      <div 
                        className="solicitud-estado"
                        style={{ backgroundColor: getEstadoColor(solicitud.estado) }}
                      >
                        {getEstadoTexto(solicitud.estado)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </>
    );
  };