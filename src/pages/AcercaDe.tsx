import { Navbar } from "../components/shared/Navbar";
import "../Styles/AcercaDe.css";
import "../global.css";
import  benjaminImg from "../assets/team/Benjamin.jpeg";
import patricioImg from "../assets/team/Patricio.jpeg";

export const AcercaDe = () => {
  return (
    <>
      <Navbar />

      <div className="AcercaDe-container container py-4">
        <h1 className="AcercaDe-titulo text-center mb-4">Acerca de</h1>

        <p className="AcercaDe-mensaje text-center mb-3">
          Esta aplicación de Recursos Humanos está diseñada para optimizar y
          centralizar la gestión interna de las organizaciones. Su objetivo
          principal es facilitar el control de asistencia del personal, la
          administración documental y la gestión de solicitudes laborales,
          entregando una experiencia eficiente, segura y fácil de utilizar.
        </p>

        <p className="AcercaDe-mensaje text-center mb-4">
          A través de esta plataforma, los colaboradores pueden acceder a su
          información personal, revisar sus marcaciones, solicitar certificados
          y realizar trámites administrativos de manera autónoma, mientras que
          la organización mejora la trazabilidad y la eficiencia de sus procesos
          internos.
        </p>

        {/* CARDS DESARROLLADORES */}
        <div className="row justify-content-center g-4 mt-4">
        <h5 className="card-title fw-bold">Diseñada por</h5>

          {/* Card Benjamin */}
          <div className="col-md-5">
            <div className="card shadow-sm h-100 text-center bg-body text-body">
              <div className="card-body">
                <img
                  src={benjaminImg}
                  alt="Benjamín Morales B."
                  className="perfil-img"
                />
                <p className="fw-bold mb-2">Benjamín Morales B.</p>
                <p className="mb-0">
                  <strong>Contacto:</strong><br />
                  benjamin.morales@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Card Patricio */}
          <div className="col-md-5">
            <div className="card shadow-sm h-100 text-center bg-body text-body">
              <div className="card-body">
                <img
                  src={patricioImg}
                  alt="Patricio Jiménez"
                  className="perfil-img"
                />
                <p className="fw-bold mb-2">Patricio Jiménez</p>
                <p className="mb-0">
                  <strong>Contacto:</strong><br />
                  patricio.jimenez@gmail.com
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
