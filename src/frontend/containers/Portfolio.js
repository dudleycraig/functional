/** containers/Portfolio **/

import React from 'react';
import {connect} from 'react-redux';

const Portfolio = props => {
  return (<section role="main" id="portfolio"></section>);
};

const PortfolioContainer = connect(state => state)(Portfolio);

export {PortfolioContainer as Portfolio};
