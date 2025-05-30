import { React } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggleButton from './components/ThemeToggleButton';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
      <div className="container-fluid">
        <Link to="/" className="nav-link active navbar-brand">
          {process.env.REACT_APP_NAME}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/about" className="nav-link active">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/music_search" className="nav-link active">Music Search</Link>
            </li>
            <li className="nav-item">
              <ThemeToggleButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
