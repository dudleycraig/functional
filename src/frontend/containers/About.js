import React from 'react';
import {connect} from 'react-redux';

const About = props => {
  return (<main role="main" id="about"></main>);
};

const AboutContainer = connect(state => state)(About);

export {AboutContainer as About};
