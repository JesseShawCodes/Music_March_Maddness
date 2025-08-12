import { render, screen } from '@testing-library/react';
import About from '@/app/page';

describe('About Page', () => {
  it('renders a heading', () => {
    render(<About />); // Render the About component

    // Use screen.getByRole to find the heading by its semantic role
    const heading = screen.getByRole('heading', { level: 1 }); // Checks for an h1 tag

    // Assert that the heading is in the document
    expect(heading).toBeInTheDocument();
    // Optionally, assert its text content
    expect(heading).toHaveTextContent('Welcome to Dadgad');
  });
  it('renders a paragraph', () => {
    render(<About />);

    // Find the paragraph by its text content
    const paragraph = screen.getByRole('paragraph')

    expect(paragraph).toBeInTheDocument();
  });
});