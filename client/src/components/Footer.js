/** components/Footer.js **/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

export default () => {
  return (
    <footer id="footer" className="navbar navbar-expand-lg fixed-bottom navbar-dark bg-primary">
      <div className="navbar-navbar d-none d-md-inline">© 2018 Dudley Craig</div>
      <div className="nav mx-auto ml-md-auto mr-md-0">
        <a href="https://github.com/dudleycraig/functional" className="hint--top" data-hint="GitHub">
          <FontAwesomeIcon icon={faGithubSquare} size="2x" />
        </a>
        <a href="mailto:dudleycraig@gmail.com" className="hint--top" data-hint="Email">
          <FontAwesomeIcon icon={faEnvelopeSquare} size="2x" />
        </a>
      </div>
    </footer>
  );
};
