/** components/CarouselItem **/

import React, {Component} from 'react';
import Technologies from 'components/Technologies';

const CarouselItem = props => {
  return (
    <li id={'item-' + props.item.index} className={'d-flex flex-column item' + (props.index === props.active ? ' active' : '')}>
      <div className="image-wrapper">
        <img className="item-image" width="400px" height="300px" />
      </div>
      <div className="caption flex-grow-1">
        <h5>{props.item.header}</h5>
        <p>{props.item.brief}</p>
        <Technologies technologies={props.item.technologies} />
      </div>
      <div className="cover">{props.updateItemStatusIcon(props.item)}</div>
    </li>
  )
}

export default CarouselItem;
