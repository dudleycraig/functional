/** index.js **/

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

import '@styles/main.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import store from '@store';
import App from '@containers/App';

import { updateAppMode } from '@actions/app';
import { fetchCarouselImage } from '@actions/carousel';

window.addEventListener('load', (event) => {
  store.dispatch(updateAppMode(event));

  const item = store.getState().carousel.items[store.getState().carousel.index];
  const source = item.images['xs'];
  if (document.getElementById('item-' + item.index)) {
    const target = document.getElementById('item-' + item.index).getElementsByClassName('item-image')[0];
    store.dispatch(fetchCarouselImage(source, target, item));
  }
});

window.addEventListener('resize', (event) => {
  store.dispatch(updateAppMode(event));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react')
);
