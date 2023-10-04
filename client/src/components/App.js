/** containers/App.js **/

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import useStore from '../store';

import Header from './Header';
import Footer from './Footer';

import Home from './Home';
import Portfolio from './Portfolio';
import Contact from './Contact';
import Resume from './Resume';
import NotFound from './NotFound';

import TechnicalSkills from './TechnicalSkills';

export default () => {
  const navigation = useStore((state) => state.navigation);
  const [page] = Object.keys(navigation.pages).filter((key) => navigation.pages[key].active === true);

  return (
    <Router>
      <Header />
      <Container className="app-body text-center">
        <Row className="app-body-header">
          <Col className="col-xl-10 col-12" style={{ maxWidth: '920px' }}>
            {navigation.pages[page] !== undefined ? (
              <h2 className="h1-responsive font-weight-bold text-center my-0 d-inline" style={{ color: 'white', opacity: 0.9 }}>
                {navigation.pages[page].title}
              </h2>
            ) : (
              <h2 className="h1-responsive font-weight-bold text-center my-0 d-inline" style={{ color: 'white', opacity: 0.9 }}>
                &nbsp;
              </h2>
            )}
          </Col>
          <Col className="col-xl-2 d-xl-inline d-none">&nbsp;</Col>
        </Row>
        <Row className="app-body-content" style={{ minHeight: '434px' }}>
          <Col className="app-body-left-column col-xl-10 col-12 mb-md-0 mb-5" style={{ maxWidth: '920px' }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/portfolio" component={Portfolio} />
              <Route path="/contact" component={Contact} />
              <Route path="/resume" component={Resume} />
              <Route component={NotFound} />
            </Switch>
          </Col>
          <Col className="app-body-right-column col-xl-2 d-xl-inline d-none text-center">
            <ul className="list-unstyled p-0 m-0">
              <li>
                <a href="mailto:dudleycraig@gmail.com" target="_blank">
                  <i className="fas fa-envelope mt-4 fa-2x"></i>
                  <p>{'dudleycraig@gmail.com'}</p>
                </a>
              </li>
              <li>
                <a href="https://goo.gl/maps/pcm5YX3jHeG1umJS8" target="_blank">
                  <i className="fas fa-map-marker-alt fa-2x"></i>
                  <p>{'Cape Town, 8060, South Africa'}</p>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        {page !== 'resume' && (
          <Row>
            <Col className="col-xl-10 col-12 text-center" style={{ maxWidth: '920px' }}>
              <TechnicalSkills />
            </Col>
            <Col className="col-xl-2 d-xl-inline d-none d-none">&nbsp;</Col>
          </Row>
        )}
      </Container>
      <Footer />
    </Router>
  );
};
