import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { InfoButton } from "../components/shared/InfoButton";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const original = await vi.importActual<any>("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("InfoButton", () => {
  test("Debe abrir y cerrar el menú al presionar ❗", () => {
    render(
      <MemoryRouter>
        <InfoButton />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("❗"));
    expect(screen.getByText("📩 Reportar problema")).toBeInTheDocument();

    fireEvent.click(screen.getByText("📩 Reportar problema").closest(".info-list-overlay")!);

    expect(screen.queryByText("📩 Reportar problema")).not.toBeInTheDocument();
  });

  test("Debe navegar al hacer click en '+'", () => {
    render(
      <MemoryRouter>
        <InfoButton />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("+"));
    expect(mockNavigate).toHaveBeenCalledWith("/navegacion");
  });
});
