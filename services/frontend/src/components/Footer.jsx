/* eslint-disable */
import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faTwitter, faXTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top navbar-dark">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0">© 2025 Music March Madness</span>
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3"><a className="text-body-secondary" href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
      <li className="ms-3"><a className="text-body-secondary" href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
      <li className="ms-3"><a className="text-body-secondary" href="#"><FontAwesomeIcon icon={faXTwitter} /></a></li>
    </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
