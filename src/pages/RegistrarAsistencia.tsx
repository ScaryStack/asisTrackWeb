
import { useState } from "react";
import { Navbar } from "../components/shared/Navbar";
import { InfoButton } from "../components/shared/InfoButton";
import { Card } from "../components/shared/Card";
import "../Styles/RegistrarAsistencia.css";
import "../global.css"


export const RegistrarAsistencia = () => {
  const fecha = new Date().toLocaleDateString();
  const [showConfirmacionEntrada, setShowConfirmacionEntrada] = useState(false);
  const [showConfirmacionSalida, setShowConfirmacionSalida] = useState(false);



const handleMarcarEntrada = () => {
    setShowConfirmacionEntrada(true);
  };

  const handleMarcarSalida = () => {
    setShowConfirmacionSalida(true);
  };



const confirmarEntrada = () => {
    // GUARDAR ENTRADA
    const ahora = new Date();
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    const horaCompleta = `${hora}:${minutos}:${segundos}`;
    const fechaCompleta = ahora.toISOString();

    const nuevaMarcacion = {
      id: Date.now(),
      tipo: 'entrada',
      fecha: fechaCompleta,
      hora: horaCompleta,
      ubicacion: 'Lugar de trabajo'
    };

    const marcacionesExistentes = JSON.parse(localStorage.getItem('misMarcaciones') || '[]');
    const nuevasMarcaciones = [...marcacionesExistentes, nuevaMarcacion];
    localStorage.setItem('misMarcaciones', JSON.stringify(nuevasMarcaciones));

    alert("✅ Entrada registrada correctamente");
    setShowConfirmacionEntrada(false);
  }

 
const confirmarSalida = () => {
    // GUARDAR SALIDA
    const ahora = new Date();
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    const horaCompleta = `${hora}:${minutos}:${segundos}`;
    const fechaCompleta = ahora.toISOString();

    const nuevaMarcacion = {
      id: Date.now(),
      tipo: 'salida',
      fecha: fechaCompleta,
      hora: horaCompleta,
      ubicacion: 'Lugar de trabajo'
    };

    const marcacionesExistentes = JSON.parse(localStorage.getItem('misMarcaciones') || '[]');
    const nuevasMarcaciones = [...marcacionesExistentes, nuevaMarcacion];
    localStorage.setItem('misMarcaciones', JSON.stringify(nuevasMarcaciones));

    alert("✅ Salida registrada correctamente");
    setShowConfirmacionSalida(false);
  };

  const cancelarAccion = () => {
    setShowConfirmacionEntrada(false);
    setShowConfirmacionSalida(false);
  };
    
  return (
    <>
      <Navbar />
      <h1 className="logo">Registro Asistencia</h1>

      <div className="mapa-card-wrapper">        
        {/* Mapa */}
        <Card>
          <div className="mapa-content">
            {/* Título centrado dentro de la card */}
            <h3 className="mapa-titulo-card">Mapa</h3>

          <div className="mapa-placeholder">
            <p>Mapa según ubicación actual</p>
          </div>

           {/* Botones de Entrada/Salida */}
        <div className="botones-container">
          <button 
            onClick={handleMarcarEntrada}
            className="boton-entrada"
          >
            Entrada
          </button>
          <button 
            onClick={handleMarcarSalida}
            className="boton-salida"
          >
            Salida
          </button>
          </div>
        </div>
        </Card>

       

        {/* Información de ubicación */}
        <Card title="Información de ubicación">
          <div className="info-ubicacion">
            <p><strong>Ubicación:</strong> Lugar de trabajo</p>
            <p><strong>Día actual:</strong> {fecha}</p>
          </div>
        </Card>
      </div>


{/* Ventana de confirmación Entrada */}
      {showConfirmacionEntrada && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar Entrada</h3>
            <p>¿Quieres marcar la entrada?</p>
            <div className="modal-buttons">
              <button className="modal-btn-si" onClick={confirmarEntrada}>
                Sí
              </button>
              <button className="modal-btn-no" onClick={cancelarAccion}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ventana de confirmación Salida */}
      {showConfirmacionSalida && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar Salida</h3>
            <p>¿Quieres marcar la salida?</p>
            <div className="modal-buttons">
              <button className="modal-btn-si" onClick={confirmarSalida}>
                Sí
              </button>
              <button className="modal-btn-no" onClick={cancelarAccion}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <InfoButton />
    </>
  );
};