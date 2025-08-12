/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Home from "../page.js";

describe('Home page', () => {
  it('renders the home page', () => {
    render(<Home />);
    expect(screen.getByText(/welcome to Dadgad/i)).toBeInTheDocument();
  });
});
