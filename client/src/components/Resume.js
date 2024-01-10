import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import useStore from '../store';
import Identification from './Identification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import Overview from './Overview';
import Projects from './Projects';
import TechIcon from './TechIcon';

const Experience = ({ months, ...props }) => {
  const years = months / 12;
  const modulus = months % 12;
  return (
    <div className="experience" {...props}>
      <pre className="years mr-3">
        {years >= 10 ? '>' : ' '}&nbsp;{('  ' + (years | 0)).slice(-2)}&nbsp;{`${years !== 1 ? 'years' : 'year '}`}
        {modulus > 0 && `, ${modulus} ${modulus > 1 ? 'months' : 'months'}`}
      </pre>
    </div>
  );
};

export default () => {
  const tech = useStore((state) => state.tech);
  const history = useHistory();
  return (
    <section id="resume" className="container flex-column">
      <Row className="print-button">
        <Col className="col-12 text-left pl-4 mx-auto w-100">
          <Button 
            className="mr-1" 
            variant="outline-light" 
            style={{ minWidth: '90px' }} 
            onClick={() => (window.print(), false)}>
            <FontAwesomeIcon icon={faPrint} size="1x" /> Print
          </Button>
        </Col>
      </Row>

      <Row id="identification">
        <Col className="col-12 text-left pl-4 mx-auto w-100">
          <Identification />
        </Col>
      </Row>

      <Row className="resume-alt-nav mb-4">
        <Button className="mr-1" variant="outline-light" style={{ minWidth: '90px' }} onClick={() => history.push('#overview')} href="#overview">
          Overview
        </Button>
        <Button className="mr-1" variant="outline-light" style={{ minWidth: '90px' }} onClick={() => history.push('#projects')} href="#projects">
          Projects
        </Button>
        <Button className="mr-1" variant="outline-light" style={{ minWidth: '90px' }} onClick={() => history.push('#skills-matrix')} href="#skills">
          Skills
        </Button>
      </Row>

      <Row id="overview">
        <h3>Overview</h3>
        <Col className="col-12 text-left pl-4">
          <Overview />
        </Col>
      </Row>

      <Row id="projects">
        <h3>Projects</h3>
        <Col className="col-12 text-left">
          <Projects />
        </Col>
      </Row>

      <Row id="skills">
        <h3>Skills</h3>
        <Col className="col-12 text-left mb-5">
          <div id="skills-header" className="w-100 d-flex flex-row align-items-start">
            <div style={{ width: '40px' }} className="text-center d-none d-md-block">
              &nbsp;
            </div>
            <div style={{ width: '150px' }} className="text-left">
              <h5>name</h5>
            </div>
            <div style={{ width: '175px' }} className="text-left d-none d-md-inline">
              <h5>experience</h5>
            </div>
            <div style={{ width: '70px' }} className="text-center d-none d-md-inline">
              <h5>current</h5>
            </div>
            <div className="text-center flex-fill">
              <h5>proficiency</h5>
            </div>
          </div>
          <div id="skills-body">
            {Object.keys(tech).map((key, index) => (
              <div className="skills-body-row w-100 d-flex flex-row align-items-start" key={`tech-${index}`} id={`tech-${key}`}>
                <div className="skills-body-icon text-center d-none d-md-block p-0 m-0" style={{ width: '40px' }}>
                  <TechIcon name={tech[key].icon} title={tech[key].title} />
                </div>
                <div className="skills-body-name text-left pl-1" scope="row" style={{ width: '150px' }} title={tech[key].description}>
                  {tech[key].title}
                </div>
                <div className="skills-body-experience text-left d-none d-md-inline" style={{ width: '175px' }}>
                  <Experience months={tech[key].months} />
                </div>
                <div className="skills-body-current text-center d-none d-md-inline">{tech[key].current && <div>&nbsp;</div>}</div>
                <div className="skills-body-proficiency text-left flex-fill px-1 small" style={{ background: `linear-gradient(to right, rgba(81, 89, 96, 0.8) ${tech[key].proficiency * 10}%, rgba(39, 43, 48, 0) 0%)` }}>
                  <span>{`${tech[key].proficiency}/10`}</span>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </section>
  );
};
