import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faAngleDoubleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight';
import faAngleDoubleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import faArchive from '@fortawesome/fontawesome-free-solid/faArchive';
import faExclamation from '@fortawesome/fontawesome-free-solid/faExclamation';

class Contact extends Component {
  render() {
    return <section role="main" id="contact" />;
  }
}

export default connect((state) => state)(Contact);
