/** components/TechnicalSkills **/

import React from 'react';

import {Redux, JQuery, CLJS, Bootstrap, Clojure, MySQL, Cassandra, Datomic} from 'components/Svg';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import faHtml5 from '@fortawesome/fontawesome-free-brands/faHtml5';
import faJs from '@fortawesome/fontawesome-free-brands/faJs';
import faCss3Alt from '@fortawesome/fontawesome-free-brands/faCss3Alt';
import faSass from '@fortawesome/fontawesome-free-brands/faSass';
import faReact from '@fortawesome/fontawesome-free-brands/faReact';
import faCode from '@fortawesome/fontawesome-free-solid/faCode';
import faCogs from '@fortawesome/fontawesome-free-solid/faCogs';
import faJava from '@fortawesome/fontawesome-free-brands/faJava';
import faPhp from '@fortawesome/fontawesome-free-brands/faPhp';
import faDatabase from '@fortawesome/fontawesome-free-solid/faDatabase';

library.add(faHtml5, faJs, faCss3Alt, faSass, faReact, faCode, faCogs, faJava, faPhp, faDatabase);

const TechnicalSkills = props => {
  return (
    <section id="technical-skills" className="content-section bg-primary text-white text-center flex-grow-1">
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
            <p>Stateless, functional, front-end application development utilizing current ES6 strategies.</p>
            <span className="mx-auto mb-3">
              <span className="svg-wrapper"><FontAwesomeIcon icon={faReact} size="2x" /></span>
              <span className="svg-wrapper"><Redux /></span>
              <span className="svg-wrapper"><JQuery /></span>
              <span className="svg-wrapper"><CLJS /></span>
            </span>  
          </div>

          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <h4><FontAwesomeIcon icon={faCode} size="3x" /></h4>
            <p>Responsive, "mobile fist" approach to ui/ux design.</p>
            <span className="mx-auto mb-3">
              <span className="svg-wrapper"><span className="text">HTML</span><FontAwesomeIcon icon={faHtml5} size="2x" /></span>
              <span className="svg-wrapper"><span className="text">CSS</span><FontAwesomeIcon icon={faCss3Alt} size="2x" /></span>
              <span className="svg-wrapper"><FontAwesomeIcon icon={faSass} size="2x" /></span>
              <span className="svg-wrapper"><Bootstrap /></span>
            </span>  
          </div>

          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <h4><FontAwesomeIcon icon={faCogs} size="3x" /></h4>
            <p>Back-end architecture and development of secure, restful APIs on a multitude of platforms.</p>
            <span className="mx-auto mb-3">
              <span className="svg-wrapper"><FontAwesomeIcon icon={faPhp} size="3x" /></span>
              <span className="svg-wrapper"><FontAwesomeIcon icon={faJava} size="3x" /></span>
              <span className="svg-wrapper"><Clojure /></span>
            </span>
          </div>

          <div className="col-lg-3 col-md-6 mb-6">
            <h4><FontAwesomeIcon icon={faDatabase} size="3x" /></h4>
            <p>Design of complex, relational structures, such as rbac authorization.<br />High volume, concurrent and dynamic mechanisms.</p>
            <span className="mx-auto mb-3">
              <span className="svg-wrapper"><MySQL /></span>
              <span className="svg-wrapper"><Cassandra /></span>
              <span className="svg-wrapper"><Datomic /></span>
            </span>
          </div>

        </div>
        <div className="row d-none d-lg-block">
          <div className="col-lg-12 col-md-12 mb-5 mb-lg-0" style={{borderBottom:'none'}}></div>
        </div>
      </div>
    </section>
  );
}

export default TechnicalSkills;
