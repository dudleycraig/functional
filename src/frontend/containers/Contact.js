import React, {Component} from 'react';
import {connect} from 'react-redux';

class Contact extends Component {
  render() {
    return (<section role="main" id="contact"></section>)
  }
};

export default connect(state => state)(Contact);
