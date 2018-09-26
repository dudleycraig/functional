import React from 'react';
import {connect} from 'react-redux';

const Contact = props => {
  return (<section role="main" id="contact"></section>);
};

const ContactContainer = connect(state => state)(Contact);

export {ContactContainer as Contact};
