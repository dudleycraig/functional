import React from 'react';
import {connect} from 'react-redux';

const About = props => {
  return (<section role="main" id="about"></section>);
};

const AboutContainer = connect(state => state)(About);

export {AboutContainer as About};
