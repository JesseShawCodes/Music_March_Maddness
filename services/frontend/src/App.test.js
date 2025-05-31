import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders App component without crashing', () => {
  render(<App />);
  expect(screen.getByText(`${process.env.REACT_APP_NAME}`)).toBeInTheDocument();
});

test('renders header and footer', () => {
  render(<App />);
  expect(screen.getByRole('navigation')).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /Dadgad/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Music Search/i })).toBeInTheDocument();
});

test('renders welcome message or default content', () => {
  render(<App />);
  expect(screen.getByText(/Build the Ultimate Song Bracket for Your Favorite Artist/i)).toBeInTheDocument();
});

test('elements have appropriate roles and accessible names', () => {
  render(<App />);
  // Example: Check if a main content area has a 'main' role
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('navigation')).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});
