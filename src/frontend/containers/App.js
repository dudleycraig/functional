/** containers/App.js **/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from 'containers/Home';
import About from 'containers/About';
import Portfolio from 'containers/Portfolio';
import Contact from 'containers/Contact';

import Header from 'components/Header';
import Footer from 'components/Footer';

import {updateNavStatus} from 'actions/app';

class App extends Component {
  render() { 
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
          <Header app={this.props.app} updateNavStatus={this.props.updateNavStatus} />
          {
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/portfolio" component={Portfolio}></Route>
          </Switch>
          }
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect(
  (state) => ({
    app:state.app
  }),
  {
    updateNavStatus:updateNavStatus
  }
)(App)
