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