/** containers/App.js **/

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import {Home} from 'containers/Home';
import {About} from 'containers/About';
import {Portfolio} from 'containers/Portfolio';
import {Contact} from 'containers/Contact';

import MainNavigation from 'components/MainNavigation';

const App = props => {
  return (
    <Router>
      <div>
        
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <MainNavigation />
        </nav>
        {
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/portfolio" component={Portfolio}></Route>
          <Route path="/contact" component={Contact}></Route>
        </Switch>
        }
      </div>
    </Router>
  );
};

const AppContainer = connect(
  state => state,
)(App);

export {AppContainer as App};
