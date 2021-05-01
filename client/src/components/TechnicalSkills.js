/** components/TechnicalSkills **/

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faCss3Alt, faSass, faReact, faJava, faPhp, faHtml5, faNodeJs } from '@fortawesome/free-brands-svg-icons';
import { faCode, faCogs, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { Redux, Bootstrap, MySQL, Cassandra, Datomic, Three } from './Svg';

export default () => {
  return (
    <section id="technical-skills" className="content-section bg-primary text-white text-center flex-grow-1">
      <span id="technical-skills-hash" style={{ position: 'absolute', top: '-70px' }} />
      <div className="container">
        <div className="content-section-heading">
          <h3 className="text-secondary mb-0">Technical</h3>
          <h2 className="mb-5">Skills</h2>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <h4>
              <FontAwesomeIcon icon={faJs} size="3x" />
            </h4>
            <p>Specializing in functional, hooks based, React development.</p>
            <span className="mx-auto mb-3">
              <span className="svg-wrapper" title="react">
                <FontAwesomeIcon icon={faReact} size="2x" />
              </span>
              <span className="svg-wrapper" title="redux / zustand">
                <Redux />
              </span>
              <span className="svg-wrapper" title="three">
                <Three />
              </span>
            </span>
          </div>

          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <h4>
              <FontAwesomeIcon icon={faCode} size="3x" />
            </h4>
            <p>Responsive, "mobile first" approach to ui/ux design utilizing Bootstrap.</p>
            <span className="mx-auto mb-3">
              <span className="svg-wrapper" title="html5">
                <span className="text">HTML</span>
                <FontAwesomeIcon icon={faHtml5} size="2x" />
              </span>
              <span className="svg-wrapper" title="css3">
                <span className="text">CSS</span>
                <FontAwesomeIcon icon={faCss3Alt} size="2x" />
              </span>
              <span className="svg-wrapper" title="sass">
                <FontAwesomeIcon icon={faSass} size="2x" />
              </span>
              <span className="svg-wrapper" title="bootstrap">
                <Bootstrap />
              </span>
            </span>
          </div>

          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <h4>
              <FontAwesomeIcon icon={faCogs} size="3x" />
            </h4>
            <p>Realtime backend API development.</p>
            <span className="mx-auto mb-3">
              <span className="svg-wrapper" title="node">
                <FontAwesomeIcon icon={faNodeJs} size="2x" />
              </span>
              <span className="svg-wrapper" title="java">
                <FontAwesomeIcon icon={faJava} size="2x" />
              </span>
              <span className="svg-wrapper" title="php">
                <FontAwesomeIcon icon={faPhp} size="2x" />
              </span>
            </span>
          </div>

          <div className="col-lg-3 col-md-6 mb-6">
            <h4>
              <FontAwesomeIcon icon={faDatabase} size="3x" />
            </h4>
            <p>Scheme development on RDBMS, NoSQL and middle-ware structures.</p>
            <span className="mx-auto mb-3">
              <span className="svg-wrapper" title="mysql">
                <MySQL />
              </span>
              <span className="svg-wrapper" title="cassandra">
                <Cassandra />
              </span>
              <span className="svg-wrapper" title="datomic">
                <Datomic />
              </span>
            </span>
          </div>
        </div>
        <div className="row d-none d-lg-block">
          <div className="col-lg-12 col-md-12 mb-5 mb-lg-0" style={{ borderBottom: 'none' }}></div>
        </div>
      </div>
    </section>
  );
};
