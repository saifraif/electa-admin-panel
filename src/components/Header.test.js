import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  test("renders the title correctly", () => {
    render(<Header title="ELECTA Admin" />);
    const titleElement = screen.getByText(/ELECTA Admin/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("contains navigation links", () => {
    render(<Header title="Test" />);
    const homeLink = screen.getByText(/Home/i);
    const aboutLink = screen.getByText(/About/i);
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
    expect(aboutLink).toHaveAttribute("href", "/about");
  });
});
