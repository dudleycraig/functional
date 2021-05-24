/** components/Technologies **/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHtml5, faJs, faCss3Alt, faSass, faReact, faJava, faPhp, faNodeJs } from '@fortawesome/free-brands-svg-icons';
import { Redux, GraphQL, JQuery, JQueryUI, CLJS, Bootstrap, Clojure, MySQL, Cassandra, Datomic, Spring, Hybris, Reagent, Magento, Backbone, Zend, Bash, PostgreSQL, StyledComponents, TypeScript } from './Svg';

export default (props) => {
  return (
    <span className="technologies">
      {props.technologies.map((technology, index) => {
        switch (technology) {
          case 'java':
            return (
              <span key={'technology-' + index} title="java" className="svg-wrapper">
                <FontAwesomeIcon icon={faJava} size="2x" />
              </span>
            );
          case 'styled-components':
            return (
              <span key={'technology-' + index} title="styled components" className="svg-wrapper">
                <StyledComponents />
              </span>
            );
          case 'typescript':
            return (
              <span key={'technology-' + index} title="typescript" className="svg-wrapper">
                <TypeScript />
              </span>
            );
          case 'react':
            return (
              <span key={'technology-' + index} title="react" className="svg-wrapper">
                <FontAwesomeIcon icon={faReact} size="2x" />
              </span>
            );
          case 'redux':
            return (
              <span key={'technology-' + index} title="redux" className="svg-wrapper">
                <Redux />
              </span>
            );
          case 'bootstrap':
            return (
              <span key={'technology-' + index} title="bootsrap" className="svg-wrapper">
                <Bootstrap />
              </span>
            );
          case 'sass':
            return (
              <span key={'technology-' + index} title="sass" className="svg-wrapper">
                <FontAwesomeIcon icon={faSass} size="2x" />
              </span>
            );
          case 'spring':
            return (
              <span key={'technology-' + index} title="spring" className="svg-wrapper">
                <Spring />
              </span>
            );
          case 'hybris':
            return (
              <span key={'technology-' + index} title="hybris" className="svg-wrapper">
                <Hybris />
              </span>
            );
          case 'jquery':
            return (
              <span key={'technology-' + index} title="jquery" className="svg-wrapper">
                <JQuery />
              </span>
            );
          case 'jquery-ui':
            return (
              <span key={'technology-' + index} title="jquery-ui" className="svg-wrapper">
                <JQueryUI />
              </span>
            );
          case 'cljs':
            return (
              <span key={'technology-' + index} title="cljs" className="svg-wrapper">
                <CLJS />
              </span>
            );
          case 'reagent':
            return (
              <span key={'technology-' + index} title="reagent" className="svg-wrapper">
                <Reagent />
              </span>
            );
          case 'magento':
            return (
              <span key={'technology-' + index} title="magento" className="svg-wrapper">
                <Magento />
              </span>
            );
          case 'mysql':
            return (
              <span key={'technology-' + index} title="mysql" className="svg-wrapper">
                <MySQL />
              </span>
            );
          case 'backbone':
            return (
              <span key={'technology-' + index} title="backbone" className="svg-wrapper">
                <Backbone />
              </span>
            );
          case 'zend2':
            return (
              <span key={'technology-' + index} title="zend" className="svg-wrapper">
                <Zend />
              </span>
            );
          case 'cassandra':
            return (
              <span key={'technology-' + index} title="casandra" className="svg-wrapper">
                <Cassandra />
              </span>
            );
          case 'bash':
            return (
              <span key={'technology-' + index} title="bash" className="svg-wrapper">
                <Bash />
              </span>
            );
          case 'node':
            return (
              <span key={'technology-' + index} title="node" className="svg-wrapper">
                <FontAwesomeIcon icon={faNodeJs} size="2x" />
              </span>
            );
          case 'postgres':
            return (
              <span key={'technology-' + index} title="postgres" className="svg-wrapper">
                <PostgreSQL />
              </span>
            );
          case 'graphql':
            return (
              <span key={'technology-' + index} title="graphql" className="svg-wrapper">
                <GraphQL />
              </span>
            );
        }
      })}
    </span>
  );
};
