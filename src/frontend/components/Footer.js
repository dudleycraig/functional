/** components/Footer.js **/

import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faTwitterSquare from '@fortawesome/fontawesome-free-brands/faTwitterSquare';
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin';
import faGithubSquare from '@fortawesome/fontawesome-free-brands/faGithubSquare';
import faGooglePlusSquare from '@fortawesome/fontawesome-free-brands/faGooglePlusSquare';
import faEnvelopeSquare from '@fortawesome/fontawesome-free-solid/faEnvelopeSquare';

library.add(faTwitterSquare, faLinkedin, faGooglePlusSquare, faGithubSquare, faEnvelopeSquare);

const Footer = props => {
  return (
    <footer id="footer" className="navbar navbar-expand-lg fixed-bottom navbar-dark bg-primary">
      <div className="navbar-navbar">© 2018 Dudley Craig</div>
      <div className="nav ml-auto">
        <a href="https://twitter.com/dudleycraig" target="_blank" className="hint--top" data-hint="Twitter">
          <FontAwesomeIcon icon={faTwitterSquare} />
        </a>
        <a href="https://www.linkedin.com/in/dudleycraig" target="_blank" className="hint--top" data-hint="LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://plus.google.com/+dudleycraig/" target="_blank" className="hint--top" data-hint="Google+">
          <FontAwesomeIcon icon={faGooglePlusSquare} />
        </a>
        <a href="https://github.com/dudleycraig/" target="_blank" className="hint--top" data-hint="GitHub">
          <FontAwesomeIcon icon={faGithubSquare} />
        </a>
        <a href="mailto:dudleycraig@gmail.com" target="_blank" className="hint--top" data-hint="Email">
          <FontAwesomeIcon icon={faEnvelopeSquare} />
        </a>
      </div>
    </footer>
  ); 
}

export default Footer;
