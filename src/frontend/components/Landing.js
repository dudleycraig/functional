/** components/Landing **/

import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Landing = props => {
  return (
    <section id="landing" className="container flex-column">
      <div className="profile">
        <img width="100px" height="100px" src="images/profile.jpg" />
      </div>
      <h1>Dudley Craig</h1>
      <p>Frontend software engineer who loves simple, functional interfaces.</p>
    </section>
  );
}

export default Landing;
