/**
 * @jest-environment jsdom
 */


import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import NavBar from '@/app/NavBar';
import { ThemeProvider } from '@/app/ThemeContext';


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

  it('renders a paragraph with specific text', () => {
    render(<Home />);

    // Find the paragraph by its text content
    const paragraph = screen.getByText(/Turn a musician’s discography into your own personal tournament. We rank the songs—your job is to pick the winners until one song is left standing. Once your bracket is complete, export and share it with friends./i);

    expect(paragraph).toBeInTheDocument();
  });

  it('renders navbar', () => {
    render(
      <ThemeProvider>
        <NavBar />
      </ThemeProvider>
    )

    // Find the link by its accessible name (text content) and role
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Search' })).toBeInTheDocument();
  });
});