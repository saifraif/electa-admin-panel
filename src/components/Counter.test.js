import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter Component", () => {
  test("starts with 0", () => {
    render(<Counter />);
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  test("increments when button is clicked", () => {
    render(<Counter />);
    fireEvent.click(screen.getByText("Increment"));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  test("resets when button is clicked", () => {
    render(<Counter />);
    fireEvent.click(screen.getByText("Increment"));
    fireEvent.click(screen.getByText("Reset"));
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });
});
