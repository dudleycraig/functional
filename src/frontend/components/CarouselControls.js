/** components/CarouselItem **/

import React, {Component} from 'react';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faAngleDoubleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight';
import faAngleDoubleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft';
library.add(faAngleDoubleRight, faAngleDoubleLeft);

const CarouselControls = props => {
  return (
    <ul className="controls">
      <li className="left">
        <button type="button" onClick={event => props.clickControlHandler((props.carousel.index - 1), 'prev')}>
          <FontAwesomeIcon icon={faAngleDoubleLeft} size="1x" />
        </button>
      </li>
      {props.carousel.items.length > 0 && props.carousel.items.slice().sort((a, b) => a.index - b.index).map((item, index) => { return(
      <li className={'indicator d-none d-lg-inline' + (item.index === props.carousel.items[props.carousel.active].index ? ' active' : '')} key={'indicator-' + index}>
        <button type="button" onClick={event => props.clickControlHandler(index, '')}>
          {item.header}
        </button>
      </li>
      )})}
      <li className="right">
        <button type="button" onClick={event => props.clickControlHandler((props.carousel.index + 1), 'next')}>
          <FontAwesomeIcon icon={faAngleDoubleRight} size="1x"/>
        </button>
      </li>
    </ul>
  )
}

export default CarouselControls;
