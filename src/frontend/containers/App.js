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

import {updateNavStatus, updateAppMode} from 'actions/app';

const App = ({navigation, updateNavStatus, updateAppMode}) => {

  const updateAppModeHandler = event => {
    const modes = ['xs', 'sm', 'md', 'lg', 'xl'];
    const active = modes.filter((modes, mode) => { 
      console.log('breakpoints', $('#breakpoints'));
      return $('#breakpoints').css('display') === 'inline';
    }, []);
    console.log('modes', active);
    updateAppMode('xs');
  }

  window.addEventListener('resize', updateAppModeHandler);

  return (
    <Router>
      <div id="app">
        <div id="breakpoints">
          <span className="d-sm-none">xs</span>
          <span className="d-none d-sm-inline d-md-none d-lg-none d-xl-none">sm</span>
          <span className="d-none d-md-inline d-lg-none d-xl-none">md</span>
          <span className="d-none d-lg-inline d-xl-none">lg</span>
          <span className="d-none d-xl-inline">xl</span>
        </div>
        <Header 
          navigation={navigation} 
          updateNavStatus={updateNavStatus} 
          updateAppMode={updateAppMode}
        />
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
  (state) => ({
    navigation:state.app.navigation
  }),
  {
    updateNavStatus:updateNavStatus
  }
)(App);

export {AppContainer as App};
