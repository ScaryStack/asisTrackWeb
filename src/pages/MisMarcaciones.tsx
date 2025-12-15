import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";
import { Card } from "../components/shared/Card";
import "../Styles/MisMarcaciones.css";
import "../global.css";

interface Marcacion {
  id: number;
  tipo: "entrada" | "salida";
  fecha: string;
  hora: string;
  ubicacion: string;
}

export const MisMarcaciones = () => {
  const navigate = useNavigate();
  const [marcaciones, setMarcaciones] = useState<Marcacion[]>([]);

  //Convierte cualquier formato de fecha a Date real
  const buildDate = (fecha: string, hora: string): Date => {
    if (fecha.includes("T")) {
      return new Date(fecha);
    }

    const [dia, mes, anio] = fecha.split("/");
    return new Date(`${anio}-${mes}-${dia}T${hora}`);
  };

  //Formato visual seguro
  const formatFecha = (fecha: string): string => {
    const date = new Date(fecha.includes("T") ? fecha : buildDate(fecha, "00:00:00"));
    return date.toLocaleDateString("es-CL");
  };

  useEffect(() => {
    const usuario = localStorage.getItem("user");
    if (!usuario) {
      navigate("/");
      return;
    }

    const marcacionesGuardadas = localStorage.getItem("misMarcaciones");

    if (marcacionesGuardadas) {
      try {
        const parsed: Marcacion[] = JSON.parse(marcacionesGuardadas);

        const ordenadas = parsed.sort((a, b) => {
          const fechaA = buildDate(a.fecha, a.hora).getTime();
          const fechaB = buildDate(b.fecha, b.hora).getTime();
          return fechaB - fechaA; // más reciente arriba
        });

        setMarcaciones(ordenadas);
      } catch (error) {
        console.error("Error al cargar marcaciones:", error);
        setMarcaciones([]);
      }
    }
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="mis-marcaciones-container">
        <h1 className="mis-marcaciones-titulo">Mis Marcaciones</h1>

        {marcaciones.length === 0 ? (
          <Card>
            <div className="sin-marcaciones">
              <p>No hay marcaciones registradas</p>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="marcaciones-lista">
              {marcaciones.map((marcacion) => (
                <div key={marcacion.id} className="marcacion-item">
                  <div className="marcacion-info">
                    <div className="marcacion-tipo" data-tipo={marcacion.tipo}>
                      {marcacion.tipo === "entrada"
                        ? "🟢 Entrada"
                        : "🔴 Salida"}
                    </div>

                    <div className="marcacion-fecha">
                      {formatFecha(marcacion.fecha)} - {marcacion.hora}
                    </div>

                    <div className="marcacion-ubicacion">
                      {marcacion.ubicacion}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </>
  );
};
