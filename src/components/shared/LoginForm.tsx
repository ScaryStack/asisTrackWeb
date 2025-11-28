import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    localStorage.setItem("usuario", email.split("@")[0]);
    navigate("/home");
  };

  return (
    <div className="container">
      <h1 className="logo">AsisTrack</h1>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo Electrónico</label>
        <input
          id="email"
          type="email"
          placeholder="Ingrese su correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Iniciar Sesión</button>
        <p className="recover">¿Olvidaste tu contraseña?</p>
      </form>
    </div>
  );
};
