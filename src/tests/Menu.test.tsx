import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Menu } from "../components/shared/Menu";
import "@testing-library/jest-dom";
import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const original = await vi.importActual<any>("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => vi.clearAllMocks());

describe("Menu Component", () => {
  test("Debe abrir y cerrar el menú al hacer click", () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    const btn = screen.getByRole("button");

    // abre
    fireEvent.click(btn);
    expect(screen.getByText("Perfil")).toBeInTheDocument();

    // cierra
    fireEvent.click(screen.getByText("Perfil"));
    expect(mockNavigate).toHaveBeenCalled();
  });

  test("Debe navegar al cerrar sesión", () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button")); // abre
    fireEvent.click(screen.getByText("Cerrar Sesión"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
