/** components/Header.js **/

import React from 'react';
import { NavLink, Route } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

library.add(faBars);

const Header = (props) => {
  const toggleNavStatusHandler = (status) => {
    props.updateNavStatus(props.app.navigation.status === 'hidden' ? 'visible' : 'hidden');
  };

  const closeNavStatusHandler = (status) => {
    props.updateNavStatus('hidden');
  };

  return (
    <header id="main-header" className="bs-component">
      <nav id="main-navigation" className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          functional.org.za
        </a>
        <button
          className={(props.app.navigation.status === 'visible' ? 'active ' : '') + 'navbar-toggler'}
          type="button"
          onClick={toggleNavStatusHandler}
        >
          <FontAwesomeIcon icon={faBars} size="1x" className="active" />
        </button>
        <div
          id="main-navigation-toggle"
          className={
            (props.app.navigation.status === 'hidden' ? 'collapse ' : '') + props.app.mode + ' navbar-collapse'
          }
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact activeClassName="active" to="/" onClick={closeNavStatusHandler}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                activeClassName="active"
                to="/portfolio"
                onClick={closeNavStatusHandler}
              >
                Portfolio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                activeClassName="active"
                to="/contact"
                onClick={closeNavStatusHandler}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
