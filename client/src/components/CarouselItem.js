/** components/CarouselItem **/

import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import Technologies from './Technologies';
import Image from './Image';
import ItemModal from './ItemModal';

export default ({ item, ...props }) => {
  const assets = `${process.env.REACT_APP_ASSETS_PROTOCOL}://${process.env.REACT_APP_ASSETS_HOST}:${process.env.REACT_APP_ASSETS_PORT}`;
  const [showModal, setShowModal] = useState(false);
  const [isGTSmall, setIsGTSmall] = useState(window.matchMedia('(min-width: 768px)').matches);

  const toggleModal = (event) => {
    setShowModal(!showModal);
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    const resizeHandler = () => setIsGTSmall(window.matchMedia('(min-width: 768px)').matches);
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  });

  return (
    <>
      <Card className="carousel-item d-flex flex-column mx-1" {...props}>
        <h4 className="card-header" style={{ cursor: 'grabbing' }}>
          {item.header}
        </h4>
        <div className="card-img" style={{ display: 'block', width: '100%', height: '130px', overflow: 'hidden', cursor: 'grabbing' }}>
          <Image src={`${assets}/${item.images['xs'][0].src}`} draggable="false" style={{ width: '100%', height: 'auto' }} />
        </div>
        <Card.Body className="pt-1" style={{ cursor: 'grabbing' }}>
          <Card.Text className="small p-0 m-0">{item.brief}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ position: 'relative', bottom: '0px', display: 'inline-block', verticalAlign: 'middle', height: '65px', minHeight: '65px', lineHeight: '65px', margin: 0 }}>
          <Technologies technologies={item.technologies} />
          {isGTSmall ? (
            <Button className="btn btn-sm" style={{ position: 'relative', verticalAlign: 'middle', float: 'right', clear: 'right', margin: '0px' }} onClick={toggleModal}>
              details
            </Button>
          ) : (
            <Button className="btn btn-sm" style={{ position: 'relative', verticalAlign: 'middle', float: 'right', clear: 'right', margin: '0px', maxWidth: '100px', padding: '0px 2px' }} onClick={toggleModal} variant="warning" disabled>
              details on larger screens
            </Button>
          )}
        </Card.Footer>
      </Card>
      <ItemModal item={item} onHide={toggleModal} show={showModal} />
    </>
  );
};
