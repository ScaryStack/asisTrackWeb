import { useEffect, useState } from "react";
import "../Styles/Perfil.css";
import { NavigationButton } from "../components/shared/NavigationButton";
import { InfoButton } from "../components/shared/InfoButton";
import { Navbar } from "../components/shared/Navbar";
import { personApi } from "../api/profileApi";

import "../global.css"

export const Perfil = () => {

  const [person, setPerson] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // GET del perfil
  useEffect(() => {
  const loadPerson = async () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        console.error("No hay usuario logueado");
        return;
      }

      const user = JSON.parse(storedUser);
      const userId = user.userId;

      const resp = await personApi.getById(userId);
      setPerson(resp.data);

    } catch (error) {
      console.error("Error al cargar perfil:", error);
    }
  };

  loadPerson();
}, []);


  // PUT del perfil
  const handleSave = async () => {
    try {
      const payload = { ...person };

      await personApi.update(person.idPerson, payload);

      alert("Perfil actualizado correctamente");
      setIsEditing(false);

    } catch (error) {
      console.log("error: ", error);
      console.error("Error al actualizar:", error);
      alert("Error al actualizar el perfil");
    }
  };

  if (!person) return <h2 style={{ textAlign: "center" }}>Cargando perfil...</h2>;

  return (
    <>
      <Navbar />
      <div>
        <div className="perfil-header">
          <h1>Perfil del Usuario</h1>

          {/* Botón Editar / Cancelar */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{
              padding: "8px 16px",
              background: isEditing ? "#dc3545" : "#28a745",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            {isEditing ? "Cancelar" : "Editar"}
          </button>
        </div>

        <div className="perfil-layout">

          {/* INFORMACIÓN */}
          <div className="perfil-content">

            {/* CONTACTO */}
            <div className="perfil-section">
              <h2>Información de Contacto</h2>

              <div className="perfil-info">
                
                {/* NOMBRE */}
                <div className="info-item">
                  <label>Nombre Trabajador:</label>
                  {isEditing ? (
                    <input
                      value={person.name}
                      onChange={(e) =>
                        setPerson({ ...person, name: e.target.value })
                      }
                    />
                  ) : (
                    <span>{person.name}</span>
                  )}
                </div>

                {/* RUT */}
                <div className="info-item">
                  <label>Rut:</label>
                  {isEditing ? (
                    <input
                      value={person.rut}
                      onChange={(e) =>
                        setPerson({ ...person, rut: e.target.value })
                      }
                    />
                  ) : (
                    <span>{person.rut}</span>
                  )}
                </div>

                {/* TELÉFONO */}
                <div className="info-item">
                  <label>Teléfono Personal:</label>
                  {isEditing ? (
                    <input
                      value={person.phone}
                      onChange={(e) =>
                        setPerson({ ...person, phone: e.target.value })
                      }
                    />
                  ) : (
                    <span>{person.phone}</span>
                  )}
                </div>

              </div>
            </div>

            {/* TRABAJO */}
            <div className="perfil-section">
              <h2>Trabajo</h2>
              <div className="perfil-info">

                {/* EMPRESA */}
                <div className="info-item">
                  <label>Empresa:</label>
                  {isEditing ? (
                    <input
                      value={person.company ?? ""}
                      onChange={(e) =>
                        setPerson({ ...person, company: e.target.value })
                      }
                    />
                  ) : (
                    <span>{person.company ?? "No definido"}</span>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* GUARDAR CAMBIOS */}
        {isEditing && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={handleSave}
              style={{
                padding: "10px 20px",
                background: "#007bff",
                color: "white",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Guardar Cambios
            </button>
          </div>
        )}

      </div>

      <InfoButton />
      <NavigationButton />
    </>
  );
};
