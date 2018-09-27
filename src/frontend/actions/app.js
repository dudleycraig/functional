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

export const updateAppMode = () => {
  return dispatch => {
    dispatch({
      type:typesApp.UPDATE_APP_MODE, 
      mode:document.getElementById('breakpoints') && (document.getElementById('breakpoints').childNodes.length > 0) ? Array.from(document.getElementById('breakpoints').childNodes).reduce((accModes, child, index, children) => { return getComputedStyle(child).display !== 'inline' ? accModes : [...accModes, child.id] }, [])[0] : 'xs'
    });
  }
};
