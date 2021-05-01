import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

export default () => {
  const history = useHistory();
  return (
    <section id="not-found" className="container flex-column">
      <Alert variant={'danger'} style={{ whiteSpace: 'pre-line' }}>
        <h3>
          <i>{window.location.href}</i> not found.
        </h3>
      </Alert>
      <Button className="mr-1" variant="outline-light" style={{ minWidth: '90px' }} onClick={() => history.push('/home')}>
        Home
      </Button>
      <Button className="mr-1" variant="outline-light" style={{ minWidth: '90px' }} onClick={() => history.push('/portfolio')}>
        Portfolio
      </Button>
      <Button className="mr-1" variant="outline-light" style={{ minWidth: '90px' }} onClick={() => history.push('/contact')}>
        Contact
      </Button>
    </section>
  );
};
