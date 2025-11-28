import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Import del componente a testear
import { NavigationButton } from "../components/shared/NavigationButton";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("NavigationButton Test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Debe renderizar el botón correctamente", () => {
    render(
      <MemoryRouter>
        <NavigationButton />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("+");
  });

  test("Debe llamar a navigate('/navegacion') al hacer click", () => {
    render(
      <MemoryRouter>
        <NavigationButton />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/navegacion");
  });
});
