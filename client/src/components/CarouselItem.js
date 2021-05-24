/** components/CarouselItem **/

import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import useStore from '../store';
import Image from './Image';
import ItemModal from './ItemModal';
import TechIcon from './TechIcon';

export default ({ item, ...props }) => {
  const assets = `${process.env.REACT_APP_ASSETS_PROTOCOL}://${process.env.REACT_APP_ASSETS_HOST}:${process.env.REACT_APP_ASSETS_PORT}`;
  const tech = useStore((state) => state.tech);
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
        <Card.Footer className="carousel-item-footer">
          {item.technologies.map(
            (technology, index) =>
              tech[technology] && (
                <a key={`portfolio-item-${index}`} href={`/resume/${tech[technology].link}`}>
                  <TechIcon name={tech[technology].icon} title={tech[technology].description} />
                </a>
              )
          )}
          {isGTSmall ? (
            <Button className="btn btn-sm" onClick={toggleModal}>
              details
            </Button>
          ) : (
            <Button className="btn btn-sm" style={{ maxWidth: '100px', padding: '0px 2px' }} onClick={toggleModal} variant="warning" disabled>
              details on larger screens
            </Button>
          )}
        </Card.Footer>
      </Card>
      <ItemModal item={item} onHide={toggleModal} show={showModal} />
    </>
  );
};
