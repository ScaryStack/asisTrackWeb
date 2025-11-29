import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";
import { Card } from "../components/shared/Card";
import "../global.css"
import "../Styles/MisSolicitudes.css";
import requestApi from "@api/requestApi";
import { mapRequestToSolicitud } from "../api/utils/solicitudMapper";
import { useAuth } from "../context/AuthContext";

type TipoSolicitud = 'vacaciones' | 'permiso-salida';
type EstadoSolicitud = 'pendiente' | 'aprobado' | 'rechazado';

export interface Solicitud {
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
  const { userId: contextUserId } = useAuth();

  // Para pruebas momentáneas si no hay login
  const userId = contextUserId || 1; // <--- Cambia a 1, 2 o 3 según tu usuario de prueba

  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    async function cargarSolicitudes() {
      try {
        const res = await requestApi.getAll();

        const convertidas = res.data
          .filter(req => req.user?.userId === userId)
          .map(r => mapRequestToSolicitud(r))
          .filter((s): s is Solicitud => s !== null);

        setSolicitudes(convertidas);
      } catch (err) {
        console.error("Error cargando solicitudes:", err);
      } finally {
        setLoading(false);
      }
    }

    cargarSolicitudes();
  }, [navigate, userId]);

  if (loading) return <p>Cargando solicitudes...</p>;

  const solicitudesVacaciones = solicitudes.filter(s => s.tipo === "vacaciones");
  const solicitudesPermiso = solicitudes.filter(s => s.tipo === "permiso-salida");

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "aprobado": return "#10b981";
      case "rechazado": return "#ef4444";
      default: return "#f59e0b";
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case "aprobado": return "Aprobado";
      case "rechazado": return "Rechazado";
      default: return "Pendiente";
    }
  };

  const formatFecha = (fecha: string) =>
    new Date(fecha).toLocaleDateString("es-ES");

  return (
    <>
      <Navbar />
      <div className="mis-solicitudes-container">
        <h1 className="mis-solicitudes-titulo">Mis Solicitudes</h1>

        {/* VACACIONES */}
        <Card>
          <div className="solicitudes-card">
            <h2 className="solicitudes-subtitulo">Vacaciones</h2>
            {solicitudesVacaciones.length === 0 ? (
              <p>No hay solicitudes de vacaciones</p>
            ) : (
              <div className="solicitudes-lista">
                {solicitudesVacaciones.map((s) => (
                  <div key={s.id} className="solicitud-item">
                    <div className="solicitud-info">
                      <div className="solicitud-fechas">
                        <span>{formatFecha(s.fechaInicio)}</span>
                        {s.fechaFin && (
                          <>
                            <span className="separador-fechas">→</span>
                            <span>{formatFecha(s.fechaFin)}</span>
                          </>
                        )}
                      </div>
                      <div className="solicitud-fecha-solicitud">
                        Solicitado: {formatFecha(s.fechaSolicitud)}
                      </div>
                    </div>
                    <div
                      className="solicitud-estado"
                      style={{ backgroundColor: getEstadoColor(s.estado) }}
                    >
                      {getEstadoTexto(s.estado)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* PERMISOS */}
        <Card>
          <div className="solicitudes-card">
            <h2 className="solicitudes-subtitulo">Permisos de salida</h2>
            {solicitudesPermiso.length === 0 ? (
              <p>No hay solicitudes de permiso</p>
            ) : (
              <div className="solicitudes-lista">
                {solicitudesPermiso.map((s) => (
                  <div key={s.id} className="solicitud-item">
                    <div className="solicitud-info">
                      <div className="solicitud-fechas">
                        <span>{formatFecha(s.fechaInicio)}</span>
                        <span className="solicitud-hora">
                          a las {s.hora ? s.hora.slice(0, 5) : "—"}
                        </span>
                      </div>
                      <div className="solicitud-motivo">{s.motivo}</div>
                      <div className="solicitud-fecha-solicitud">
                        Solicitado: {formatFecha(s.fechaSolicitud)}
                      </div>
                    </div>
                    <div
                      className="solicitud-estado"
                      style={{ backgroundColor: getEstadoColor(s.estado) }}
                    >
                      {getEstadoTexto(s.estado)}
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
