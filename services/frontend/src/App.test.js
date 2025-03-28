import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders App component without crashing', () => {
  render(<App />);
  expect(screen.getByText(`${process.env.REACT_APP_NAME}`)).toBeInTheDocument();
});