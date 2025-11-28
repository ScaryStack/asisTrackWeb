import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Card } from "../components/shared/Card";

describe("Card", () => {
  test("Renderiza el título si se entrega", () => {
    render(<Card title="Mi tarjeta">Contenido</Card>);
    expect(screen.getByText("Mi tarjeta")).toBeInTheDocument();
  });

  test("Renderiza los children", () => {
    render(<Card>Hola mundo</Card>);
    expect(screen.getByText("Hola mundo")).toBeInTheDocument();
  });
});
