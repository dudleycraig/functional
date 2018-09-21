/** store **/

import thunkMiddleware from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import app from 'reducers/app';

export const store = createStore(
  combineReducers({ 
      app
  }), applyMiddleware(thunkMiddleware));

export default store;
