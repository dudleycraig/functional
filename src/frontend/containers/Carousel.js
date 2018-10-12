/** components/Carousel **/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faAngleDoubleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight';
import faAngleDoubleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import faArchive from '@fortawesome/fontawesome-free-solid/faArchive';
import faExclamation from '@fortawesome/fontawesome-free-solid/faExclamation';

import CarouselItem from 'components/CarouselItem';
import CarouselControls from 'components/CarouselControls';

import {sortCarousel, fetchCarouselImage, updateDirection} from 'actions/carousel';

library.add(faSpinner, faArchive, faExclamation);

class Carousel extends Component {
  constructor() {
    super(...arguments);
  }

  updateItemStatusIcon = item => {
    switch (item.status) {
      case ('no-image'): return (<FontAwesomeIcon icon={faArchive} size="3x" />);
      case ('loading'): return (<FontAwesomeIcon icon={faSpinner} size="3x" pulse />);
      case ('has-image'): return ('');
      case ('error'): return (<FontAwesomeIcon icon={faExclamation} size="3x" className="error" />);
      default: return (<FontAwesomeIcon icon={faArchive} size="3x" />);
    }
  }

  fetchCarouselImageHandler = item => {
    const target = document.getElementById('item-' + item.index).getElementsByClassName('item-image')[0];
    const source = item.images['xs'];
    if(!target.getAttribute('src') || target.getAttribute('src') === '') {
      this.props.fetchCarouselImage(source, target, item);
    }
  }

  sortItems = event => {
    const items = document.getElementById('carousel-items');
    const item = this.props.carousel.items[this.props.carousel.items.findIndex(item => item.index === this.props.carousel.index)];
    items.style.transition = 'none';
    items.style.transform = 'none';
    items.style.left = 'auto'; 
    this.props.sortCarousel();
  }

  moveCarouselAnimate = (update, direction) => {
    const index = update > (this.props.carousel.items.length - 1) ? 0 : update < 0 ? (this.props.carousel.items.length - 1) : update;
    const items = document.getElementById('carousel-items');
    switch (direction) {
      case('next'): { 
          items.style.transition = 'transform 0.5s ease-out';
          items.style.transform = 'translateX(-306px)'; 
          break; 
      }

      case('prev'): { 
          items.style.transition = 'transform 0.5s ease-out';
          items.style.transform = 'translateX(+306px)'; 
          break; 
      }

      default: { 
          items.style.transition = 'transform 0.1s ease-out';
          items.style.transform = 'translateX(0px)'; 
          break; 
      }
    }
    this.props.updateDirection(direction, index);
  }

  moveCarouselAnimated = resolve => {
    document.getElementById('carousel-items').removeEventListener('transitionend', this.moveCarouselAnimated);
    resolve();
  }

  moveCarouselInit = (update, direction) => {
    return new Promise((resolve, reject) => {
      document.getElementById('carousel-items').addEventListener(
        'transitionend', 
        event => this.moveCarouselAnimated(resolve),
        false
      );
      this.moveCarouselAnimate(update, direction);
    });
  }

  moveCarouselHandler = (update, direction) => {
    this.moveCarouselInit(update, direction)
    .then(() => {
      const item = this.props.carousel.items[this.props.carousel.items.findIndex(item => item.index === this.props.carousel.index)];
      this.sortItems();
      this.fetchCarouselImageHandler(item);
      document.getElementById('carousel-items').removeEventListener('transitionend', );
    });
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillReceiveProps() {
  }

  render() {
    const itemWidth = 306; 

    return (
      <section id="carousel" className="content-section bg-primary text-white text-center flex-grow-1">
        <div className="container">
          <div 
            className="carousel-wrapper"
            style={{
                width:((itemWidth * (this.props.carousel.items.length)) + (itemWidth * 2)) + 'px',
            }}
          >
            <ul 
              className="items row" 
              id="carousel-items"
              style={{
                  width:(itemWidth * (this.props.carousel.items.length)) + 'px'
              }}
              onMouseDown={this.onMouseDownHandler}
              onTouchStart={this.onTouchStartHandler}
            >{
              this.props.carousel.items.length > 0 && 
              this.props.carousel.items.map((item, index) =>  
                <CarouselItem key={'item-' + item.index} item={item} index={index} active={this.props.carousel.active} updateItemStatusIcon={this.updateItemStatusIcon} />
              )
            }</ul>
          </div>
          <CarouselControls carousel={this.props.carousel} moveCarouselHandler={this.moveCarouselHandler} />
        </div>
      </section>
    );
  }  
}

export default connect(
  state => ({mode:state.app.mode, carousel:state.carousel}), 
  {sortCarousel:sortCarousel, fetchCarouselImage:fetchCarouselImage, updateDirection:updateDirection}
)(Carousel)
