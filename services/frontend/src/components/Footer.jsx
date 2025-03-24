/* eslint-disable */
import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram, faLinkedin, faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className="container">
      <footer className="py-3 my-4 border-top navbar-dark">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="mb-3 mb-md-0">© 2025 {process.env.REACT_APP_NAME}</div>
          <ul className="nav col-md-4 list-unstyled">
            <li className="ms-3"><a className="text-body-secondary" href="#" title="Instagram"><FontAwesomeIcon icon={faInstagram} /></a></li>
            <li className="ms-3"><a className="text-body-secondary" href="#" title="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a></li>
            <li className="ms-3"><a className="text-body-secondary" href="#" title="Twitter"><FontAwesomeIcon icon={faXTwitter} /></a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
