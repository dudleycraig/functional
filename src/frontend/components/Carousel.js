/** components/Carousel **/

import React from 'react';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import faAngleDoubleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight';
import faAngleDoubleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import faArchive from '@fortawesome/fontawesome-free-solid/faArchive';
import faExclamation from '@fortawesome/fontawesome-free-solid/faExclamation';

library.add(faAngleDoubleRight, faAngleDoubleLeft, faSpinner, faArchive, faExclamation);

const Carousel = props => {
  const itemWidth = 306; 

  const updateItemStatusIcon = item => {
    switch (item.status) {
      case ('no-image'): return (<FontAwesomeIcon icon={faArchive} size="3x" />);
      case ('loading'): return (<FontAwesomeIcon icon={faSpinner} size="3x" pulse />);
      case ('has-image'): return ('');
      case ('error'): return (<FontAwesomeIcon icon={faExclamation} size="3x" className="error" />);
      default: return (<FontAwesomeIcon icon={faArchive} size="3x" />);
    }
  }

  const fetchCarouselImageHandler = item => {
    const target = document.getElementById('item-' + item.index).getElementsByClassName('item-image')[0];
    const source = item.images['xs'];
    if(!target.getAttribute('src') || target.getAttribute('src') === '') {
      props.fetchCarouselImage(source, target, item);
    }
  }

  const moveCarouselHandler = (update, direction) => {
    const index = update > (props.carousel.items.length - 1) ? 0 : update < 0 ? (props.carousel.items.length - 1) : update;
    const item = props.carousel.items[props.carousel.items.findIndex(item => item.index === index)];
    props.moveCarousel(index, direction);
    fetchCarouselImageHandler(item);
  }

  return (
    <section id="carousel" className="content-section bg-primary text-white text-center flex-grow-1">
      <div className="container">
        <ul className="items row" style={{width:(itemWidth * (props.carousel.items.length)) + 'px'}}>
        {props.carousel.items.length > 0 && props.carousel.items.map((item, index) => { return(
          <li key={'item-' + item.index} id={'item-' + item.index} className={'item' + (index === props.carousel.active ? ' active' : '')}>
            <div className="image-wrapper">
              <img 
                className="item-image"
                width="400px"
                height="300px"
              />
            </div>
            <div className="caption">
              <h5>{item.header}</h5>
              <p>{item.brief}</p>
            </div>
            <div className="cover">{updateItemStatusIcon(item)}</div>
          </li>
        )})}
        </ul>
        <ul className="controls">
          <li className="left">
            <button type="button" onClick={event => moveCarouselHandler((props.carousel.index - 1), 'prev')}><FontAwesomeIcon icon={faAngleDoubleLeft} size="1x" /></button>
          </li>
          {props.carousel.items.length > 0 && props.carousel.items.slice().sort((a, b) => a.index - b.index).map((item, index) => { return(
          <li className={'indicator d-none d-lg-inline' + (item.index === props.carousel.items[props.carousel.active].index ? ' active' : '')} key={'indicator-' + index}>
            <button type="button" onClick={event => moveCarouselHandler(index, '')}>{item.header}</button>
          </li>
          )})}
          <li className="right">
            <button type="button" onClick={event => moveCarouselHandler((props.carousel.index + 1), 'next')}><FontAwesomeIcon icon={faAngleDoubleRight} size="1x" /></button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Carousel;
