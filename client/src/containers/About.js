import React, {Component} from 'react';
import {connect} from 'react-redux';

class About extends Component {
  render() {
    return (<section role="main" id="about"></section>)
  }
};

export default connect(state => state)(About);
