/** containers/App.js **/

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import {store} from 'store';

import {Home} from 'containers/Home';
import {About} from 'containers/About';
import {Portfolio} from 'containers/Portfolio';
import {Contact} from 'containers/Contact';

import Header from 'components/Header';
import Footer from 'components/Footer';

import {updateNavStatus} from 'actions/app';

const App = ({app, updateNavStatus}) => {
  return (
    <Router>
      <div id="app">
        <div id="breakpoints">
          <span id="xs" className="d-sm-none" />
          <span id="sm" className="d-none d-sm-inline d-md-none d-lg-none d-xl-none" />
          <span id="md" className="d-none d-md-inline d-lg-none d-xl-none" />
          <span id="lg" className="d-none d-lg-inline d-xl-none" />
          <span id="xl" className="d-none d-xl-inline" />
        </div>
        <Header app={app} updateNavStatus={updateNavStatus} />
        {
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/portfolio" component={Portfolio}></Route>
        </Switch>
        }
        <Footer />
      </div>
    </Router>
  );
};

const AppContainer = connect(
  (state) => ({
    app:state.app
  }),
  {
    updateNavStatus:updateNavStatus
  }
)(App);

export {AppContainer as App};
