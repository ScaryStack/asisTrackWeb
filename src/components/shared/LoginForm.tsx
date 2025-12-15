import { useState, useEffect } from "react";
import { getAllUsers } from "../../api/userApi";
import type { User } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Correo o contraseña incorrectos");
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Iniciar sesión</h1>

      <div>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"} 
          placeholder="Contraseña"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <i
          className={`bi ${
            showPassword ? "bi-eye-slash" : "bi-eye"
          } password-eye`}
          onClick={() => setShowPassword(!showPassword)}
        ></i>
      </div>

      {error && <div className="text-danger mt-2">{error}</div>}

      <button type="submit" disabled={loading}>
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>

      <p className="recover">¿Olvidaste tu contraseña?</p>
    </form>
  );
};
