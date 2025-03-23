/* eslint-disable */
import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faTwitter, faXTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top navbar-dark">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0  text-decoration-none lh-1">
            <svg className="bi" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
          </a>
          <span className="mb-3 mb-md-0">© 2025 Music March Madness</span>
          <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li class="ms-3"><a class="text-body-secondary" href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
      <li class="ms-3"><a class="text-body-secondary" href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
      <li class="ms-3"><a class="text-body-secondary" href="#"><FontAwesomeIcon icon={faXTwitter} /></a></li>
    </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
