/** store **/

import thunkMiddleware from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware, compose } from 'redux';

import app from 'reducers/app';
import carousel from 'reducers/carousel';

export const store = createStore(
  combineReducers({ 
      app,
      carousel
  }), applyMiddleware(thunkMiddleware)
);

export default store;
