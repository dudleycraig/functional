import React from 'react';
import {connect} from 'react-redux';

const Contact = props => {
  return (<main role="main" id="contact"></main>);
};

const ContactContainer = connect(state => state)(Contact);

export {ContactContainer as Contact};
