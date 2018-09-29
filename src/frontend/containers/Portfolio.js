/** containers/Portfolio **/

import React from 'react';
import {connect} from 'react-redux';

const Portfolio = ({app}) => {
  return (
    <main id="portfolio" className="d-flex flex-column">
    </main>
  );
};

const PortfolioContainer = connect(
  (state) => ({
    app:state.app
  }),
  { }
)(Portfolio);

export {PortfolioContainer as Portfolio};
