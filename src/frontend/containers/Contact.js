import React from 'react';
import {connect} from 'react-redux';

const Contact = props => {
  return (<div id="contact"></div>);
};

const ContactContainer = connect(state => state)(Contact);

export {ContactContainer as Contact};
