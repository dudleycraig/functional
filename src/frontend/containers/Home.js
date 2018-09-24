import React from 'react';
import {connect} from 'react-redux';

const Home = props => {
  return (
    <main role="main" id="home" className="container">
      <div className="profile">
        <img width="100px" height="100px" src="images/profile.jpg" />
      </div>
      <h1>Dudley Craig</h1>
      <p>Hey, I'm a versatile FrontEnd engineer who loves to code simple, functional interfaces.</p>
    </main>
  );
};

const HomeContainer = connect(state => state)(Home);

export {HomeContainer as Home};
