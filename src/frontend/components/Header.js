/** components/Header.js **/

import React from 'react';
import {NavLink, Route} from 'react-router-dom';
import ResponsiveMenu from 'react-responsive-navbar';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

library.add(faBars);

const crumb = (part, partIndex, parts) => {
  const path = ['', ...parts.slice(0, partIndex+1)].join("/");
  return <Link key={path} to={path} >{part}</Link>
};

const Breadcrumbs = () => (
  <Route path="*" render={
    props => {
      let parts = props.location.pathname.split('/');
      const place = parts[parts.length-1];
      parts = parts.slice(1, parts.length-1);

      return (
        <ol className="ml-auto breadcrumb">
          <li className="breadcrumb-item"><a href="functional.org.za">functional.org.za</a></li>
          <li className="breadcrumb-item">{place}</li>
        </ol>
      );
    }
  } />
);

          
const menuOpenButton = (<FontAwesomeIcon icon={faBars} size="1x" />);

const menuCloseButton = (<FontAwesomeIcon icon={faBars} size="1x" className="active" />);

const Header = props => {
  return (
    <header id="main-header">
      <div className="main-navigation navbar navbar-expand-lg navbar-dark bg-primary">
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
    </header>
  ); 
}

export default Header;
