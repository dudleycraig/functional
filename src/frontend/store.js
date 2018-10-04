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

  const item = store.getState().carousel.items[store.getState().carousel.index];
  const source = item.images['xs'];
  if (document.getElementById('item-' + item.index)) {
    const target = document.getElementById('item-' + item.index).getElementsByClassName('item-image')[0];
    store.dispatch(fetchCarouselImage(source, target, item));
  }
});

window.addEventListener('resize', event => {
  store.dispatch(updateAppMode(event));
});

export default store;
