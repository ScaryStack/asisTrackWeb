import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";
import { Card } from "../components/shared/Card";
import "../Styles/Solicitudes.css";
import { useAuth } from "../context/AuthContext";
import { vacationApi } from "../api/vacationApi";
import { permissionApi } from "../api/permissionApi";
import type { VacationModel } from "../models/Vacation";
import type { PermissionModel } from "../models/Permission";
import "../global.css";

type TipoSolicitud = "VACATION" | "PERMISSION";

type RangoSolicitud = {
  inicio: number;
  fin: number;
};

export const Solicitudes = () => {
  const navigate = useNavigate();
  const { tipo } = useParams<{ tipo: string }>();
  const { userId: contextUserId } = useAuth();
  const userId = contextUserId || 1;

  const [tipoSolicitud, setTipoSolicitud] = useState<TipoSolicitud>("VACATION");
  const [horaActual, setHoraActual] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [motivo, setMotivo] = useState("");
  const [rangosExistentes, setRangosExistentes] = useState<RangoSolicitud[]>([]);

  // ---------- FECHA HOY LOCAL ----------
  const getHoyLocal = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const hoy = getHoyLocal();

  // ---------- NORMALIZAR FECHA BACKEND ----------
  const normalizarFechaParaBackend = (fecha: string) =>
    `${fecha}T12:00:00`;

  const parseFechaSegura = (fecha: string) => {
    const d = new Date(fecha);
    d.setHours(12, 0, 0, 0);
    return d.getTime();
  };

  // ---------- detectar tipo ----------
  useEffect(() => {
    if (tipo === "permiso-salida") setTipoSolicitud("PERMISSION");
    else if (tipo === "vacaciones") setTipoSolicitud("VACATION");
    else navigate("/navegacion");
  }, [tipo, navigate]);

  // ---------- limpiar ----------
  useEffect(() => {
    setFechaInicio("");
    setFechaFin("");
    setMotivo("");
  }, [tipoSolicitud]);

  // ---------- hora ----------
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setHoraActual(
        `${now.getHours().toString().padStart(2, "0")}:` +
          `${now.getMinutes().toString().padStart(2, "0")}:` +
          `${now.getSeconds().toString().padStart(2, "0")}`
      );
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  // ---------- cargar solicitudes existentes ----------
  useEffect(() => {
    const cargarSolicitudes = async () => {
      try {
        const vacacionesResp = await vacationApi.getAll();
        const permisosResp = await permissionApi.getAll();

        const vacaciones = vacacionesResp.data.filter(
          (v: any) => v.request?.user?.userId === userId
        );

        const permisos = permisosResp.data.filter(
          (p: any) => p.request?.user?.userId === userId
        );

        const rangos: RangoSolicitud[] = [
          ...vacaciones.map((v: any) => ({
            inicio: parseFechaSegura(v.dateStart),
            fin: parseFechaSegura(v.dateFinish),
          })),
          ...permisos.map((p: any) => ({
            inicio: parseFechaSegura(p.date),
            fin: parseFechaSegura(p.date),
          })),
        ];

        setRangosExistentes(rangos);
      } catch (error) {
        console.error("Error cargando solicitudes", error);
      }
    };

    cargarSolicitudes();
  }, [userId]);

  // ---------- util ----------
  const esDiaHabil = (fecha: string) => {
    const [y, m, d] = fecha.split("-").map(Number);
    const day = new Date(y, m - 1, d).getDay();
    return day !== 0 && day !== 6;
  };

  // ---------- CRUCE DE FECHAS ----------
  const hayCruceDeFechas = (inicio: string, fin: string) => {
    const iniNueva = parseFechaSegura(inicio);
    const finNueva = parseFechaSegura(fin);

    return rangosExistentes.some(
      (r) => iniNueva <= r.fin && finNueva >= r.inicio
    );
  };

  // ---------- AGREGAR RANGO LOCAL  ----------
  const agregarRangoLocal = (inicio: string, fin: string) => {
    setRangosExistentes((prev) => [
      ...prev,
      {
        inicio: parseFechaSegura(inicio),
        fin: parseFechaSegura(fin),
      },
    ]);
  };

  // ---------- validación ----------
  const validarFormulario = () => {
    if (!fechaInicio || !fechaFin) {
      alert("Debes completar fecha inicio y fecha fin");
      return false;
    }

    if (fechaInicio < hoy) {
      alert("No puedes seleccionar una fecha anterior a hoy");
      return false;
    }

    if (fechaFin < fechaInicio) {
      alert("La fecha fin no puede ser menor que la fecha inicio");
      return false;
    }

    if (!esDiaHabil(fechaInicio) || !esDiaHabil(fechaFin)) {
      alert("Solo se permiten días hábiles (lunes a viernes)");
      return false;
    }

    if (hayCruceDeFechas(fechaInicio, fechaFin)) {
      alert("Ya tienes una solicitud en ese rango de fechas");
      return false;
    }

    if (tipoSolicitud === "PERMISSION") {
      if (!motivo.trim()) {
        alert("Debes ingresar un motivo");
        return false;
      }
      if (motivo.length > 300) {
        alert("Máximo 300 caracteres");
        return false;
      }
    }

    return true;
  };

  // ---------- ENVIAR ----------
  const handleEnviar = async () => {
    if (!validarFormulario()) return;

    const idRequest = Math.floor(Math.random() * 1000000);
    const now = new Date().toISOString();

    try {
      if (tipoSolicitud === "VACATION") {
        const nuevaSolicitud: Partial<VacationModel> = {
          dateStart: normalizarFechaParaBackend(fechaInicio),
          dateFinish: normalizarFechaParaBackend(fechaFin),
          request: {
            idRequest,
            status: "PENDING",
            requestType: "VACATION",
            creationDate: now,
            user: { userId },
          },
        };

        await vacationApi.create(nuevaSolicitud);
        agregarRangoLocal(fechaInicio, fechaFin);

      } else {
        const nuevaSolicitud: Partial<PermissionModel> = {
          reason: motivo,
          date: normalizarFechaParaBackend(fechaInicio),
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
        agregarRangoLocal(fechaInicio, fechaInicio);
      }

      alert("Solicitud enviada correctamente");
      navigate("/mis-solicitudes");

    } catch (e) {
      console.error(e);
      alert("Error al enviar la solicitud");
    }
  };

  return (
    <>
      <Navbar />

      <div className="solicitudes-container">
        <h1 className="solicitudes-logo">
          {tipoSolicitud === "VACATION"
            ? "Solicitud de Vacaciones"
            : "Permiso de Salida"}
        </h1>

        <Card>
          <div className="form-group">
            <label>Fecha Inicio</label>
            <input
              type="date"
              min={hoy}
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Fecha Fin</label>
            <input
              type="date"
              min={fechaInicio || hoy}
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>

          {tipoSolicitud === "PERMISSION" && (
            <div className="form-group">
              <label>Motivo</label>
              <textarea
                value={motivo}
                maxLength={300}
                rows={4}
                onChange={(e) => setMotivo(e.target.value)}
              />
              <small>{motivo.length} / 300</small>
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
        </Card>
      </div>
    </>
  );
};
