/** containers/App.js **/

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import {Home} from 'containers/Home';
import {About} from 'containers/About';
import {Portfolio} from 'containers/Portfolio';
import {Contact} from 'containers/Contact';

import Header from 'components/Header';
import Footer from 'components/Footer';

const App = props => {
  return (
    <Router>
      <div id="app">
        <Header />
        {
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/portfolio" component={Portfolio}></Route>
          <Route path="/contact" component={Contact}></Route>
        </Switch>
        }
        <Footer />
      </div>
    </Router>
  );
};

const AppContainer = connect(
  state => state,
)(App);

export {AppContainer as App};
