import React from 'react';
import {connect} from 'react-redux';

const Home = props => {
  return (<div id="home"></div>);
};

const HomeContainer = connect(state => state)(Home);

export {HomeContainer as Home};
