/** components/MainNavigation.js **/

import React from 'react';
import {NavLink} from 'react-router-dom';
import ResponsiveMenu from 'react-responsive-navbar';
import Breadcrumbs from 'components/Breadcrumbs';

const menuOpenButton = (
  <button className="btn btn-secondary fas fa-arrow-down" type="button">
  </button>
);

const menuCloseButton = (
  <button className="btn btn-secondary fas fa-arrow-up open" type="button">
  </button>
);

const MainNavigation = props => {
  return (
    <div id="MainNavigation">
      <ResponsiveMenu
        menuOpenButton={menuOpenButton}
        menuCloseButton={menuCloseButton}
        changeMenuOn="500px"
        largeMenuClassName="desktop"
        smallMenuClassName="mobile"
        menu={
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" exact activeClassName="active" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact activeClassName="active" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact activeClassName="active" to="/portfolio">Portfolio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact activeClassName="active" to="/contact">Contact</NavLink>
            </li>
          </ul>
        }
      />
    </div>
  ); 
}

export default MainNavigation;
