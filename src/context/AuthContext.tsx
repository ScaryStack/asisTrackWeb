import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  userId: number | null;
  login: (id: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Para pruebas, inicializamos con un userId fijo (por ejemplo usuario 2: Bmorales)
  const [userId, setUserId] = useState<number | null>(2);

  const login = (id: number) => {
    setUserId(id);
    // También opcionalmente guardar en localStorage si quieres persistencia:
    // localStorage.setItem("userId", id.toString());
  };

  const logout = () => {
    setUserId(null);
    // localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
