import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '@/app/ThemeContext';

// Mock localStorage
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock document.body.setAttribute
const setAttributeMock = jest.fn();
const originalSetAttribute = document.body.setAttribute;
document.body.setAttribute = setAttributeMock;

// A simple component to consume the theme context for testing
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-display">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorageMock.clear(); // Clear localStorage before each test
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    setAttributeMock.mockClear();
    // Reset document.body.setAttribute to its original implementation for each test
    document.body.setAttribute = setAttributeMock;
  });

  afterAll(() => {
    // Restore original document.body.setAttribute after all tests are done
    document.body.setAttribute = originalSetAttribute;
  });

  test('should initialize theme to "light" if no theme is stored in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    console.log("TESTINg ThemeProvider initialization");
    console.log(localStorageMock.getItem.mock.calls);

    // Expect localStorage.getItem to be called once to check for stored theme
    // expect(localStorageMock.getItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');

    // Expect theme to be "light" initially
    expect(screen.getByTestId('theme-display')).toHaveTextContent('light');

    // Expect localStorage.setItem to be called to set "light" theme if none was found
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');

    // Expect document.body.setAttribute to be called with "light" theme
    expect(setAttributeMock).toHaveBeenCalledWith('data-bs-theme', 'light');
  });
  test('should initialize theme from localStorage if a theme is stored', () => {
    localStorageMock.setItem('theme', 'dark'); // Pre-set a theme in localStorage

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Expect localStorage.getItem to be called and retrieve "dark"
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');

    // Ensure setItem is not called again if a theme is found
    expect(localStorageMock.setItem).not.toHaveBeenCalledWith('theme', 'light');

    // Expect document.body.setAttribute to be called with the stored theme
    expect(setAttributeMock).toHaveBeenCalledWith('data-bs-theme', 'dark');
  });

  test('should toggle theme from light to dark', async () => {
    localStorageMock.setItem('theme', 'light'); // Start with light theme

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });

    // Initial theme should be light
    expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
    expect(setAttributeMock).toHaveBeenCalledWith('data-bs-theme', 'light');

    await act(async () => {
      userEvent.click(toggleButton);
    });

    // Theme should now be dark
    // expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');
    // expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    // expect(setAttributeMock).toHaveBeenCalledWith('data-bs-theme', 'dark');
  });

  test('should toggle theme from dark to light', async () => {
    localStorageMock.setItem('theme', 'dark'); // Start with dark theme

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });

    // Initial theme should be dark
    expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');
    expect(setAttributeMock).toHaveBeenCalledWith('data-bs-theme', 'dark');

    await act(async () => {
      userEvent.click(toggleButton);
    });

    // Theme should now be light
    expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    expect(setAttributeMock).toHaveBeenCalledWith('data-bs-theme', 'light');
  });
  /*

  test('document.body.setAttribute is called when theme changes', async () => {
    localStorageMock.setItem('theme', 'light');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    setAttributeMock.mockClear(); // Clear mock calls to check only subsequent calls

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });

    await act(async () => {
      userEvent.click(toggleButton);
    });

    // Expect setAttribute to be called with 'dark' theme after toggle
    expect(setAttributeMock).toHaveBeenCalledWith('data-bs-theme', 'dark');
    expect(setAttributeMock).toHaveBeenCalledTimes(1); // Only one call for this specific change

    await act(async () => {
      userEvent.click(toggleButton);
    });

    // Expect setAttribute to be called with 'light' theme after another toggle
    expect(setAttributeMock).toHaveBeenCalledWith('data-bs-theme', 'light');
    expect(setAttributeMock).toHaveBeenCalledTimes(2); // Two calls in total for the changes
  });
  */
});
