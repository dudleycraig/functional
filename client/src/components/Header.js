/** components/Header.js **/

import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faImages, faHome } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav } from 'react-bootstrap';
import useStore from '../store';

const Header = () => {
  const navigation = useStore((state) => state.navigation);
  const faIconMap = { faEnvelope, faImages, faHome };

  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const [{}, page] = location.pathname.split('/');
    navigation.toggle(page);
  }, [location]);

  return (
    <header id="main-header" className="bs-component">
      <Navbar id="main-navigation" className="navbar-dark bg-primary" variant="dark" expand="md" fixed="top" collapseOnSelect>
        <Nav.Link className="navbar-brand" onClick={() => history.push('/home')}>
          functional.org.za
        </Nav.Link>
        <Nav className="justify-content-left flex-row">
          {Object.keys(navigation.pages).map((key) => (
            <Nav.Link key={`page-${key}`} className={`nav-link ${navigation.pages[key].active && 'active'}`} onClick={() => history.push(navigation.pages[key].link)}>
              <FontAwesomeIcon icon={faIconMap[navigation.pages[key].icon]} size="1x" />
              <span className="ml-1 d-md-inline d-none">{navigation.pages[key].title}</span>
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
