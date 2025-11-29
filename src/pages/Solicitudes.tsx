import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";
import { Card } from "../components/shared/Card";
import "../Styles/Solicitudes.css";
import { useAuth } from "../context/AuthContext";
import { vacationApi } from "../api/vacationApi";
import { permissionApi } from "../api/permissionApi";
import type { VacationModel } from "../models/Vacation";
import type { PermissionModel } from "../models/Permission";
import "../global.css"

type TipoSolicitud = "VACATION" | "PERMISSION";

export const Solicitudes = () => {
  const navigate = useNavigate();
  const { userId: contextUserId } = useAuth();
  const userId = contextUserId || 1;

  const [tipo, setTipo] = useState<TipoSolicitud>("VACATION");
  const [horaActual, setHoraActual] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [motivo, setMotivo] = useState("");

  // Fecha mínima (hoy)
  const hoy = new Date().toISOString().split("T")[0];

  // ----- función para saber si es día hábil -----
  const esDiaHabil = (fecha: string) => {
    const d = new Date(fecha).getDay();
    return d !== 0 && d !== 6; // 0 domingo, 6 sábado
  };

  // ----- actualizar hora --------
  useEffect(() => {
    const actualizarHora = () => {
      const ahora = new Date();
      const h = ahora.getHours().toString().padStart(2, "0");
      const m = ahora.getMinutes().toString().padStart(2, "0");
      const s = ahora.getSeconds().toString().padStart(2, "0");
      setHoraActual(`${h}:${m}:${s}`);
    };
    actualizarHora();
    const interval = setInterval(actualizarHora, 1000);
    return () => clearInterval(interval);
  }, []);

  // ------ VALIDACIÓN PRINCIPAL -----
  const validarFechas = () => {
    if (!fechaInicio) {
      alert("Debes seleccionar una fecha");
      return false;
    }

    if (fechaInicio < hoy) {
      alert("No puedes seleccionar una fecha anterior a hoy");
      return false;
    }

    if (! esDiaHabil(fechaInicio)) {
      alert("Solo puedes seleccionar días hábiles (Lunes a Viernes)");
      return false;
    }

    if (tipo === "VACATION") {
      if (!fechaFin) {
        alert("Debes seleccionar una fecha fin");
        return false;
      }

      if (fechaFin < fechaInicio) {
        alert("La fecha fin no puede ser menor a la fecha inicio");
        return false;
      }

      if (!esDiaHabil(fechaFin)) {
        alert("La fecha fin debe ser un día hábil (Lunes a Viernes)");
        return false;
      }
    }

    return true;
  };

  // ------- ENVIAR ---------
  const handleEnviar = async () => {
    if (!userId) return;

    if (!validarFechas()) return;

    try {
      const now = new Date().toISOString();
      const idRequest = Math.floor(Math.random() * 1000000);

      if (tipo === "VACATION") {
        const nuevaSolicitud: Partial<VacationModel> = {
          daysAvailable: 0,
          dateStart: fechaInicio,
          dateFinish: fechaFin,
          request: {
            idRequest,
            status: "PENDING",
            requestType: "VACATION",
            creationDate: now,
            user: { userId },
          },
        };
        await vacationApi.create(nuevaSolicitud);
      } else if (tipo === "PERMISSION") {
        const nuevaSolicitud: Partial<PermissionModel> = {
          reason: motivo,
          date: fechaInicio,
          hour: horaActual,
          request: {
            idRequest,
            status: "PENDING",
            requestType: "PERMISSION",
            creationDate: now,
            user: { userId },
          },
        };
        await permissionApi.create(nuevaSolicitud);
      }

      alert(`${tipo === "VACATION" ? "Vacaciones" : "Permiso"} enviado correctamente`);
      navigate("/mis-solicitudes");

    } catch (err: any) {
      console.error(err);
      alert("Error al enviar la solicitud");
    }
  };

  return (
    <>
      <Navbar />
      <div className="solicitudes-container">
        <h1 className="solicitudes-logo">Solicitudes</h1>
        <Card>
          <div className="card-content">
            
            <div className="form-group">
              <label>Tipo de Solicitud</label>
              <select 
                value={tipo} 
                onChange={(e) => setTipo(e.target.value as TipoSolicitud)}
              >
                <option value="VACATION">Vacaciones</option>
                <option value="PERMISSION">Permiso de salida</option>
              </select>
            </div>

            <div className="form-group">
              <label>{tipo === "VACATION" ? "Fecha Inicio" : "Fecha"}</label>
              <input
                type="date"
                min={hoy}
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>

            {tipo === "VACATION" && (
              <div className="form-group">
                <label>Fecha Fin</label>
                <input
                  type="date"
                  min={fechaInicio || hoy}
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                />
              </div>
            )}

            {tipo === "PERMISSION" && (
              <div className="form-group">
                <label>Motivo</label>
                <input
                  type="text"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label>Hora</label>
              <div>{horaActual}</div>
            </div>

            <div className="form-buttons">
              <button onClick={handleEnviar}>Enviar</button>
              <button onClick={() => navigate("/navegacion")}>Cancelar</button>
            </div>

          </div>
        </Card>
      </div>
    </>
  );
};
