import React from 'react';
import {connect} from 'react-redux';

const Home = props => {
  return (
    <section role="main" id="home" className="container">
      <div className="profile">
        <img width="100px" height="100px" src="images/profile.jpg" />
      </div>
      <h1>Dudley Craig</h1>
      <p>Versatile software engineer who loves to code simple, functional interfaces.</p>
    </section>
  );
};

const HomeContainer = connect(state => state)(Home);

export {HomeContainer as Home};
