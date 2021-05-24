import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Overview from './Overview';

export default () => {
  const history = useHistory();
  return (
    <section id="landing" className="container flex-column">
      <div className="profile">
        <img width="100px" height="100px" alt="dudley's ugly mug" src="images/profile.jpg" />
      </div>
      <Overview />
      <Button className="mr-1" variant="outline-light" style={{ minWidth: '90px' }} onClick={() => history.push('/portfolio')}>
        Portfolio
      </Button>
      <Button className="mr-1" variant="outline-light" style={{ minWidth: '90px' }} onClick={() => history.push('/contact')}>
        Contact
      </Button>
      <Button className="mr-1 d-md-none d-inline-block" variant="outline-light" style={{ minWidth: '90px' }} href="#technical-skills-hash">
        Skills
      </Button>
    </section>
  );
};
