import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { LoginForm } from "../components/shared/LoginForm";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const original = await vi.importActual<any>("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("LoginForm", () => {
  test("Debe mostrar alerta si los campos están vacíos", () => {
    window.alert = vi.fn(); // mock del alert

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: "Iniciar Sesión" });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalled();
  });

  test("Debe navegar a /home al ingresar datos", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Correo Electrónico"), {
      target: { value: "test@email.com" },
    });

    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "12345" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Iniciar Sesión" }));

    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });
});
