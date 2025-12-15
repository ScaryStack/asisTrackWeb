import { Navbar } from "../components/shared/Navbar";
import "../Styles/Contacto.css";
import "../global.css";

export const Contacto = () => {
  return (
    <>
      <Navbar />

      <div className="Contacto-container container py-4">
        <h1 className="Contacto-titulo text-center mb-4">Contacto</h1>

        <p className="Contacto-mensaje text-center mb-5">
          Para cualquier consulta relacionada con tu información laboral,
          asistencia, documentación o solicitudes administrativas, puedes
          comunicarte a través de los siguientes canales según corresponda.
        </p>

        <div className="row justify-content-center g-4">
          {/* Card Empleador */}
          <div className="col-md-5">
            <div className="card shadow-sm h-100 bg-body text-body">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  Contacto Empleador
                </h5>
                <p className="card-text">
                  Área de Recursos Humanos<br />
                  <strong>Correo:</strong> rrhh@empresa.cl<br />
                  <strong>Teléfono:</strong> +56 9 1234 5678<br />
                  <strong>Horario:</strong> Lunes a Viernes, 09:00 a 18:00 hrs.
                </p>
              </div>
            </div>
          </div>

          {/* Card Jefatura */}
          <div className="col-md-5">
            <div className="card shadow-sm h-100 bg-body text-body">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  Contacto Jefatura Directa
                </h5>
                <p className="card-text">
                  Para temas operativos, coordinación de turnos o consultas
                  relacionadas con tus funciones, debes contactar a tu
                  jefatura inmediata a través de los canales internos
                  definidos por la organización.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
