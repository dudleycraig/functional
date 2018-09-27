/** store **/

import thunkMiddleware from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import app from 'reducers/app';
import {updateAppMode} from 'actions/app';

export const store = createStore(
  combineReducers({ 
      app
  }), applyMiddleware(thunkMiddleware)
);

window.addEventListener('resize', event => {
  store.dispatch(updateAppMode(event));
});

export default store;
