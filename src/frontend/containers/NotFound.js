import React from 'react';
import {connect} from 'react-redux';

const NotFound = props => {
  return (<section role="main" id="not-found"><h1>Not Found</h1></section>);
};

const NotFoundContainer = connect(state => state)(NotFound);

export {NotFoundContainer as NotFound};
