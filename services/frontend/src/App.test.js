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