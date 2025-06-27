import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders a heading', () => {
    render(<Home />); // Render the Home component

    // Use screen.getByRole to find the heading by its semantic role
    const heading = screen.getByRole('heading', { level: 1 }); // Checks for an h1 tag

    // Assert that the heading is in the document
    expect(heading).toBeInTheDocument();
    // Optionally, assert its text content
    expect(heading).toHaveTextContent('Dadgad');
  });
  /*
  it('renders a paragraph with specific text', () => {
    render(<Home />);

    // Find the paragraph by its text content
    const paragraph = screen.getByText(/This is the home page./i); // Case-insensitive regex

    expect(paragraph).toBeInTheDocument();
  });

  it('renders a link to the about page', () => {
    render(<Home />);

    // Find the link by its accessible name (text content) and role
    const link = screen.getByRole('link', { name: /Go to About Page/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about'); // Check the link's href attribute
  });
  */
});