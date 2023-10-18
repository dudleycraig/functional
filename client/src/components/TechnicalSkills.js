/** components/TechnicalSkills **/

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faCogs, faDatabase } from '@fortawesome/free-solid-svg-icons';
import useStore from '../store';
import TechIcon from './TechIcon';

export default () => {
  const tech = useStore((state) => state.tech);
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
              <TechIcon name={tech['javascript'].icon} title={tech['javascript'].description} style={{ width: '66px', height: '66px', fill: '#ffffff' }} />
            </h4>
            <p>Front-end React/Helix development of WebGL and GIS applications.</p>
            <span className="mx-auto mb-3">
              <a href={`/resume/${tech['react'].link}`}>
                <TechIcon name={tech['react'].icon} title={tech['react'].description} />
              </a>
              <a href={`/resume/${tech['webgl'].link}`}>
                <TechIcon name={tech['webgl'].icon} title={tech['webgl'].description} />
              </a>
              <a href={`/resume/${tech['gis'].link}`}>
                <TechIcon name={tech['gis'].icon} title={tech['gis'].description} />
              </a>
            </span>
          </div>

          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <h4>
              <FontAwesomeIcon icon={faCode} size="3x" />
            </h4>
            <p>Responsive, "mobile first" layouts.</p>
            <span className="mx-auto mb-3">
              <a href={`/resume/${tech['bootstrap'].link}`}>
                <TechIcon name={tech['bootstrap'].icon} title={tech['bootstrap'].description} />
              </a>
              <a href={`/resume/${tech['mobile'].link}`}>
                <TechIcon name={tech['mobile'].icon} title={tech['webgl'].description} />
              </a>
              <a href={`/resume/${tech['desktop'].link}`}>
                <TechIcon name={tech['desktop'].icon} title={tech['webgl'].description} />
              </a>
            </span>
          </div>

          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <h4>
              <FontAwesomeIcon icon={faCogs} size="3x" />
            </h4>
            <p>Back-end integration of multiple resources into a consolidated stream.</p>
            <span className="mx-auto mb-3">
              <a href={`/resume/${tech['express'].link}`}>
                <TechIcon name={tech['express'].icon} title={tech['express'].description} style={{ width: '50px' }} />
              </a>
              <a href={`/resume/${tech['linux'].link}`}>
                <TechIcon name={tech['linux'].icon} title={tech['linux'].description} />
              </a>
              <a href={`/resume/${tech['docker'].link}`}>
                <TechIcon name={tech['docker'].icon} title={tech['docker'].description} />
              </a>
            </span>
          </div>

          <div className="col-lg-3 col-md-6 mb-6">
            <h4>
              <FontAwesomeIcon icon={faDatabase} size="3x" />
            </h4>
            <p>Schema modelling on both normalized and denormalized structures.</p>
            <span className="mx-auto mb-3">
              <a href={`/resume/${tech['schema-design'].link}`}>
                <TechIcon name={tech['schema-design'].icon} title={tech['schema-design'].description} />
              </a>
              <a href={`/resume/${tech['mongodb'].link}`}>
                <TechIcon name={tech['mongodb'].icon} title={tech['mongodb'].description} />
              </a>
              <a href={`/resume/${tech['graphql-server'].link}`}>
                <TechIcon name={tech['postgresql'].icon} title={tech['postgresql'].description} />
              </a>
            </span>
          </div>
        </div>
        <div className="row d-none d-md-block">
          <div className="col-lg-12 col-md-12 mb-5 mb-lg-0" style={{ borderBottom: 'none' }}></div>
        </div>
      </div>
    </section>
  );
};
