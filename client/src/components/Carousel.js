/** components/Carousel **/

import React, { useRef, useEffect } from 'react';
import useStore from '../store';
import { Row, Col } from 'react-bootstrap';

import useDrag from '../hooks/useDrag';
import ControlItems from './ControlItems';
import CarouselItem from './CarouselItem';

const range = (from, to) => Array.from({ length: to - from + 1 }, (v, k) => k + from);

export default () => {
  const { items, shift, midIndex } = useStore((state) => state.carousel);
  const itemWidth = 300;
  const carouselItemsRef = useRef();
  const next = () => carouselItemsRef.current.animate([{ transform: 'translateX(0px)' }, { transform: `translateX(${itemWidth}px)` }], { duration: 400, easing: 'ease-in' }).finished.then(() => shift('prev'));
  const prev = () => carouselItemsRef.current.animate([{ transform: 'translateX(0px)' }, { transform: `translateX(${-itemWidth}px)` }], { duration: 400, easing: 'ease-in' }).finished.then(() => shift('next'));

  // drag events
  const drag = useDrag(carouselItemsRef);
  useEffect(() => {
    if (drag.dragging && drag.prev.x) {
      drag.prev.x > drag.current.x ? prev() : next();
      drag.dragging = false;
    }
  }, [drag]);

  // click events
  const shiftAnimation = (direction, nextItem = {}) => {
    switch (direction) {
      case 'prev':
        prev();
        break;

      case 'next':
        next();
        break;

      case 'shuffle':
        const nextIndex = items.findIndex((item) => item.name === nextItem.name);
        const steps = Math.abs(nextIndex - midIndex);

        // wait for an animation to end before proceeding with the next animation
        range(1, steps).reduce(async (previous) => {
          await previous;
          return nextIndex > midIndex ? prev() : next();
        }, Promise.resolve());
        break;
    }
  };

  return (
    <div id="carousel" style={{ marginTop: '20px' }}>
      <div className="carousel-window" style={{ position: 'relative', width: '100%', height: '323px', overflow: 'hidden' }}>
        <div className="carousel-wrapper mx-auto" style={{ position: 'absolute', left: '-9999px', right: '-9999px' }}>
          <Row className="carousel-items d-inline-flex px-0 mx-0 align-items-stretch" style={{ width: `${items.length * itemWidth}px`, height: '310px' }} ref={carouselItemsRef}>
            {items.map((item) => (
              <Col key={`carousel-item-${item.name}`} className={`px-0 d-inline-flex flex-row justify-content-center align-items-stretch h-100`}>
                <CarouselItem item={item} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <ControlItems items={items} shift={shiftAnimation} />
    </div>
  );
};
