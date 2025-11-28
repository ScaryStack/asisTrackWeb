import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InfoList } from "../components/shared/InfoList";

describe("InfoList", () => {
  test("Debe renderizar las 4 opciones correctamente", () => {
    render(<InfoList />);

    expect(screen.getByText("📩 Reportar problema")).toBeInTheDocument();
    expect(screen.getByText("🚫 No puedo marcar asistencia")).toBeInTheDocument();
    expect(screen.getByText("🧩 Apoyo usuario")).toBeInTheDocument();
    expect(screen.getByText("📘 Instructivo de uso")).toBeInTheDocument();
  });
});
