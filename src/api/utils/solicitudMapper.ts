// src/api/utils/solicitudMapper.ts
import type { RequestModel } from "@models/Request";
import type { Solicitud } from "@pages/MisSolicitudes";

export function mapRequestToSolicitud(req: RequestModel): Solicitud | null {
  if (req.requestType === "VACATION" && req.vacation) {
    return {
      id: req.idRequest,
      tipo: "vacaciones",
      fechaInicio: req.vacation.dateStart,
      fechaFin: req.vacation.dateFinish,
      hora: "",
      motivo: "",
      estado: req.status.toLowerCase() as "pendiente" | "aprobado" | "rechazado",
      fechaSolicitud: req.creationDate
    };
  }

  if (req.requestType === "PERMISSION" && req.permission) {
    return {
      id: req.idRequest,
      tipo: "permiso-salida",
      fechaInicio: req.permission.startDate,
      hora: req.permission.startTime,
      motivo: req.permission.reason,
      estado: req.status.toLowerCase() as "pendiente" | "aprobado" | "rechazado",
      fechaSolicitud: req.creationDate
    };
  }

  return null;
}
