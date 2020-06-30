/** containers/Portfolio **/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Carousel from 'containers/Carousel';

class Portfolio extends Component {
  render() {
    return (
      <main id="portfolio" className="d-flex flex-column">
        <Carousel />
      </main>
    );
  }
}

export default connect(
  (state) => ({}),
  {}
)(Portfolio);
