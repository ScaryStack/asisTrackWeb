import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";
import { Card } from "../components/shared/Card";
import "../Styles/MisMarcaciones.css";

interface Marcacion {
  id: number;
  tipo: 'entrada' | 'salida';
  fecha: string;
  hora: string;
  ubicacion: string;
}

export const MisMarcaciones = () => {
  const navigate = useNavigate();
  const [marcaciones, setMarcaciones] = useState<Marcacion[]>([]);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
      navigate("/");
      return;
    }

    // Cargar marcaciones desde localStorage
    const marcacionesGuardadas = localStorage.getItem('misMarcaciones');
    if (marcacionesGuardadas) {
      try {
        const parsed = JSON.parse(marcacionesGuardadas);
        setMarcaciones(parsed);
      } catch (error) {
        console.error('Error al cargar marcaciones:', error);
        setMarcaciones([]);
      }
    }
  }, [navigate]);

  const formatFecha = (fecha: string): string => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

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
                      {marcacion.tipo === 'entrada' ? '🟢 Entrada' : '🔴 Salida'}
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