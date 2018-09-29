import React from 'react';
import {connect} from 'react-redux';

import Landing from 'components/Landing';
import TechnicalSkills from 'components/TechnicalSkills';

const Home = ({app}) => {
  return (
    <main id="home" className="d-flex flex-column">
      <Landing />
      <TechnicalSkills mode={app.mode} />
    </main>
  );
};

const HomeContainer = connect(
  (state) => ({
    app:state.app
  }),
  { }
)(Home);

export {HomeContainer as Home};
