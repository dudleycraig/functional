/** components/Technologies **/

import React, {Component} from 'react';

import {Redux, JQuery, JQueryUI, CLJS, Bootstrap, Clojure, MySQL, Cassandra, Datomic, Spring, Hybris, Reagent, Magento, Backbone, Zend, Bash, Postgres} from 'components/Svg';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import faAngleDoubleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight';
import faAngleDoubleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import faArchive from '@fortawesome/fontawesome-free-solid/faArchive';
import faExclamation from '@fortawesome/fontawesome-free-solid/faExclamation';
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
import faNodeJs from '@fortawesome/fontawesome-free-brands/faNodeJs';

library.add(faNodeJs);

const Technologies = props => {
  return (
    <span className="technologies">
    {props.technologies.map((technology, index) => {
      switch(technology) {
        case ('react'): return (<span key={'technology-' + index} className="svg-wrapper"><FontAwesomeIcon icon={faReact} size="2x" /></span>);
        case ('redux'): return (<span key={'technology-' + index} className="svg-wrapper"><Redux /></span>);
        case ('bootstrap'): return (<span key={'technology-' + index} className="svg-wrapper"><Bootstrap /></span>);
        case ('sass'): return (<span key={'technology-' + index} className="svg-wrapper"><FontAwesomeIcon icon={faSass} size="2x" /></span>);
        case ('spring'): return (<span key={'technology-' + index} className="svg-wrapper"><Spring /></span>);
        case ('hybris'): return (<span key={'technology-' + index} className="svg-wrapper"><Hybris /></span>);
        case ('jquery'): return (<span key={'technology-' + index} className="svg-wrapper"><JQuery /></span>);
        case ('jquery-ui'): return (<span key={'technology-' + index} className="svg-wrapper"><JQueryUI /></span>);
        case ('cljs'): return (<span key={'technology-' + index} className="svg-wrapper"><CLJS /></span>);
        case ('reagent'): return (<span key={'technology-' + index} className="svg-wrapper"><Reagent /></span>);
        case ('magento'): return (<span key={'technology-' + index} className="svg-wrapper"><Magento /></span>);
        case ('mysql'): return (<span key={'technology-' + index} className="svg-wrapper"><MySQL /></span>);
        case ('backbone'): return (<span key={'technology-' + index} className="svg-wrapper"><Backbone /></span>);
        case ('zend2'): return (<span key={'technology-' + index} className="svg-wrapper"><Zend /></span>);
        case ('cassandra'): return (<span key={'technology-' + index} className="svg-wrapper"><Cassandra /></span>);
        case ('bash'): return (<span key={'technology-' + index} className="svg-wrapper"><Bash /></span>);
        case ('node'): return (<span key={'technology-' + index} className="svg-wrapper"><FontAwesomeIcon icon={faNodeJs} size="2x" /></span>);
        case ('postgres'): return (<span key={'technology-' + index} className="svg-wrapper"><Postgres /></span>);
      }
    })}
    </span>
  );
}

export default Technologies;
