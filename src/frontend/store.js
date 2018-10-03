/** store **/

import thunkMiddleware from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware, compose } from 'redux';

import app from 'reducers/app';
import carousel from 'reducers/carousel';

import {updateAppMode} from 'actions/app';
import {fetchCarouselImage} from 'actions/carousel';

export const store = createStore(
  combineReducers({ 
      app,
      carousel
  }), applyMiddleware(thunkMiddleware)
);

window.addEventListener('load', event => {
  store.dispatch(updateAppMode(event));

  /**
  const state = store.getState();
  const item = state.carousel.items[state.carousel.items.findIndex(item => item.index === state.carousel.index)];
  const target = document.getElementById('item-' + item.index).getElementsByClassName('item-image')[0];
  const source = item.images['lg'];
  store.dispatch(fetchCarouselImage(source, target));
   **/
});

window.addEventListener('resize', event => {
  store.dispatch(updateAppMode(event));
});

export default store;
