/** index.js **/

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

import './styles/main.scss';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {App} from 'containers/App';
import store from 'store';

ReactDOM.render(
  <Provider store={store}>
     <App />
  </Provider>, 
  document.getElementById('react')
);
