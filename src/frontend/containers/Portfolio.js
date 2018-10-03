/** containers/Portfolio **/

import React from 'react';
import {connect} from 'react-redux';

import Carousel from 'components/Carousel';

import {moveCarousel, fetchCarouselImage} from 'actions/carousel';

const Portfolio = ({mode, carousel, moveCarousel, fetchCarouselImage}) => {
  return (
    <main id="portfolio" className="d-flex flex-column">
      <Carousel mode={mode} carousel={carousel} moveCarousel={moveCarousel} fetchCarouselImage={fetchCarouselImage} />
    </main>
  );
};

const PortfolioContainer = connect(
  (state) => ({
    mode:state.app.mode,
    carousel:state.carousel
  }),
  { 
    moveCarousel:moveCarousel,
    fetchCarouselImage:fetchCarouselImage
  }
)(Portfolio);

export {PortfolioContainer as Portfolio};
