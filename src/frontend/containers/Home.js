import React, {Component} from 'react';
import {connect} from 'react-redux';

import Landing from 'components/Landing';
import TechnicalSkills from 'components/TechnicalSkills';

class Home extends Component {
  render() {
    return (
      <main id="home" className="d-flex flex-column">
        <Landing />
        <TechnicalSkills mode={this.props.app.mode} />
      </main>
    )
  }
}

export default connect(
  (state) => ({
    app:state.app
  }),
  { }
)(Home);
