/** components/ItemModal **/

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Modal, Carousel, Button, Container } from 'react-bootstrap';
import Image from './Image';

export default ({ item, onHide, show, ...props }) => {
  const assets = `${process.env.REACT_APP_ASSETS_PROTOCOL}://${process.env.REACT_APP_ASSETS_HOST}:${process.env.REACT_APP_ASSETS_PORT}`;
  const [interval, toggleInterval] = useState(null);

  return (
    <Modal id="item-modal" show={show} onHide={onHide} dialogClassName="modal-80w" {...props}>
      <Modal.Header className="" closeButton>
        <Modal.Title>{item.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex-grow-1 text-center p-0">
        <Carousel className="h-100 p-0" slide={true} touch={true} interval={interval} fade={true} pause={false}>
          {item.images['lg'].map((image, index) => (
            <Carousel.Item key={`item-modal-${index}`} className="text-center">
              <Image className="w-auto h-100" src={`${assets}/${image.src}`} />
              <Carousel.Caption>{image.description}</Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
      <Modal.Footer className="text-align-center">
        <Button onClick={() => toggleInterval(interval ? null : 3000)} className="btn" style={{ minWidth: '110px', whiteSpace: 'nowrap' }}>
          <i className="mr-2">
            <FontAwesomeIcon icon={interval > 0 ? faPause : faPlay} />
          </i>
          <span>{interval > 0 ? 'playing' : 'paused'}</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
