import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../ThemeContext';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="form-check form-switch mt-2 d-flex justify-content-center">
      <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={toggleTheme} />
      <label className="nav-item mx-3" htmlFor="flexSwitchCheckDefault">
        {theme === 'light' ? <FontAwesomeIcon icon={faSun} className="text-warning" /> : <FontAwesomeIcon icon={faMoon} />}
      </label>
    </div>
  );
}

export default ThemeToggleButton;
