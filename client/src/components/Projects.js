import React, { useContext } from 'react';
import { Row, Col, Card, Accordion, AccordionContext, useAccordionToggle } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import useStore from '../store';
import Image from './Image';
import TechLink from './TechLink';

const Log = () => (console.log('projects-testing'), null);

const IconToggle = ({ children, eventKey, ...props }) => {
  const currentEventKey = useContext(AccordionContext);
  const decorateOnClick = useAccordionToggle(eventKey, () => {});
  const isCurrentEventKey = currentEventKey === eventKey;
  return (
    <a role="button" onClick={decorateOnClick} {...props}>
      <FontAwesomeIcon icon={isCurrentEventKey ? faCaretUp : faCaretDown} title={isCurrentEventKey ? 'close' : 'open'} size="1x" />
    </a>
  );
};

const HeaderToggle = ({ children, eventKey, ...props }) => {
  const decorateOnClick = useAccordionToggle(eventKey, () => {});
  return (
    <span role="button" onClick={decorateOnClick} {...props}>
      {children}
    </span>
  );
};

export default () => {
  const assets = `${process.env.REACT_APP_ASSETS_PROTOCOL}://${process.env.REACT_APP_ASSETS_HOST}:${process.env.REACT_APP_ASSETS_PORT}`;
  const projects = useStore((state) => state.projects);
  return projects.map((project, projectIndex) => [
    <h4 key={`project-header-${projectIndex}`} className="project-header">
      <i>{`${project.employer}, ${project.from} - ${project.to.length > 0 ? project.to : 'current'}`}</i>
    </h4>,
    <Accordion key={`project-body-${projectIndex}`} className="project-body">
      {project.clients.map((client, clientIndex) => (
        <Card key={`project-${projectIndex}_client-${clientIndex}`}>
          <HeaderToggle eventKey={`client-${clientIndex}`}>
            <Card.Header className="card-header container">
              <Row>
                <Col className="col-md-10">
                  <span>
                    {(client.link && (
                      <a href={client.link} title={client.name} onClick={(event) => event.stopPropagation()}>
                        {client.name}
                      </a>
                    )) || <span>{client.name}</span>}
                    &nbsp;<span className="d-none d-md-inline">{client.description}</span>
                  </span>
                </Col>
                <Col className="round-button col-md-2">
                  <IconToggle eventKey={`client-${clientIndex}`} className="float-right text-center" style={{ width: '26px', height: '26px', lineHeight: '26px', border: '1px solid #cccccc', borderRadius: '26px' }} />
                </Col>
              </Row>
            </Card.Header>
          </HeaderToggle>
          <Accordion.Collapse eventKey={`client-${clientIndex}`}>
            <Card.Body>
              <Image 
                src={`${assets}/${client.images.cover.sm.src}`}
                className="d-none d-md-inline" 
                style={{width: '100%', height: 'auto'}}
              />
              <i>responsibilities</i>.
              <ul className="mb-0">
                {client.responsibilities.map((responsibility, index) => (
                  <li key={`project-${projectIndex}_client-${clientIndex}_responsibility-${index}`}>{responsibility}</li>
                ))}
              </ul>
              <i>technologies</i>.
              <ul>
                <li>
                  {'front-end: [ '}
                  {client.technologies.frontend &&
                    client.technologies.frontend.map((technology, index) => (
                      <span key={`project-${projectIndex}_client-${clientIndex}_front-end-${index}`}>
                        {index > 0 ? ', ' : ''}
                        <TechLink name={technology} />
                      </span>
                    ))}
                  {' ]'}
                </li>
                <li>
                  {'back-end: [ '}
                  {client.technologies.backend &&
                    client.technologies.backend.map((technology, index) => (
                      <span key={`project-${projectIndex}_client-${clientIndex}_back-end-${index}`}>
                        {index > 0 ? ', ' : ''}
                        <TechLink name={technology} />
                      </span>
                    ))}
                  {' ]'}
                </li>
                <li>
                  {'resources: [ '}
                  {client.technologies.applications &&
                    client.technologies.applications.map((technology, index) => (
                      <span key={`project-${projectIndex}_client-${clientIndex}_application-${index}`}>
                        {index > 0 ? ', ' : ''}
                        <TechLink name={technology} />
                      </span>
                    ))}
                  {' ]'}
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>,
  ]);
};
