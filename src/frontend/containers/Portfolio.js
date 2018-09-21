/** containers/Portfolio **/

import React from 'react';
import {connect} from 'react-redux';

const Portfolio = props => {
  return (<div id="portfolio"></div>);
};

const PortfolioContainer = connect(state => state)(Portfolio);

export {PortfolioContainer as Portfolio};
