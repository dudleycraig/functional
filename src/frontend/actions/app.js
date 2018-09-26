/** actions/app **/

import {types as typesApp} from 'types/app';

export const updateNavStatus = status => {
  return dispatch => {
    dispatch({
      type:typesApp.UPDATE_NAV_STATUS, 
      status:status
    });
  }
};

export const updateAppMode = mode => {
  return dispatch => {
    dispatch({
      type:typesApp.UPDATE_APP_MODE, 
      mode:mode
    });
  }
};
