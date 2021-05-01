/** components/CarouselItem **/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonGroup } from 'react-bootstrap';

export default ({ items, shift }) => (
  <ButtonGroup className="control-items">
    <Button className="btn btn-secondary btn-lg" onClick={() => shift('prev')}>
      <FontAwesomeIcon icon={faAngleDoubleLeft} size="2x" />
    </Button>
    {[...items]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((item) => (
        <Button key={`control-item-${item.name}`} className={`btn btn-secondary btn-lg d-none d-lg-inline ${item.active ? 'active' : ''}`} onClick={() => shift('shuffle', item)}>
          {item.header}
        </Button>
      ))}
    <Button className="btn btn-secondary btn-lg" onClick={() => shift('next')}>
      <FontAwesomeIcon icon={faAngleDoubleRight} size="2x" />
    </Button>
  </ButtonGroup>
);
