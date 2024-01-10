import React from 'react';
import Time from './Time';
import TechLink from './TechLink';

export default () => {
  return (
    <dl id="identification" style={{ display: 'inline-block', listStyle: 'none' }}>
      <dt className="text-right pr-2" style={{ float: 'left', clear: 'left', width: '100px' }}>
        FULL NAME
      </dt>
      <dd className="text-left" style={{ float: 'left' }}>
        Dudley Craig
      </dd>
      <dt className="text-right pr-2" style={{ float: 'left', clear: 'left', width: '100px' }}>
        LOCATION
      </dt>
      <dd className="text-left" style={{ float: 'left' }}>
        <a href="https://goo.gl/maps/pcm5YX3jHeG1umJS8" target="_blank" title="[-33.919545175839765, 18.38205572274231]">
          Cape Town, South Africa
        </a>
        &nbsp;
        <span className="gmt d-none d-md-inline">
          (+2 GMT, <Time />)
        </span>
      </dd>
      <dt className="text-right pr-2" style={{ float: 'left', clear: 'left', width: '100px' }}>
        LANGUAGE
      </dt>
      <dd className="text-left" style={{ float: 'left' }}>
        English, Afrikaans
      </dd>
      <dt className="text-right pr-2" style={{ float: 'left', clear: 'left', width: '100px' }}>
        EMAIL
      </dt>
      <dd className="text-left" style={{ float: 'left' }}>
        <a href="mailto:dudleycraig@gmail.com" target="_blank">
          dudleycraig@gmail.com
        </a>
      </dd>
      <dt className="text-right pr-2" style={{ float: 'left', clear: 'left', width: '100px' }}>
        WEBSITE
      </dt>
      <dd className="text-left" style={{ float: 'left' }}>
        <a href="http://functional.org.za" target="_blank">
          http://functional.org.za
        </a>
      </dd>
      <dt className="text-right pr-2" style={{ float: 'left', clear: 'left', width: '100px' }}>
        ROLE
      </dt>
      <dd className="text-left" style={{ float: 'left' }}>
        freelance, full-stack (services, web, android, iphone)
      </dd>
      <dt className="text-right pr-2" style={{ float: 'left', clear: 'left', width: '100px' }}>
        CORE TECH
      </dt>
      <dd className="text-left" style={{ float: 'left' }}>
        <TechLink name="clojure" />/<TechLink name="clojurescript" />
        {' \'('}
        <TechLink name="integrant" />
        {' '}
        <TechLink name="reagent" />
        {' '}
        <TechLink name="tailwindcss" />
        {')'}
      </dd>
    </dl>
  );
};
