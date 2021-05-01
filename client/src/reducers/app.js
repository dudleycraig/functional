/** reducers/app **/

import {types as typesApp} from 'types/app';

const initialState = { 
  mode:'',
  messages:{
    max:1,
    counter:0,
    hash:{}
  },
  navigation:{
    status:'hidden',
  }
};

export default (state = initialState, action = {}) => {
  switch(action.type) {

    case typesApp.UPDATE_NAV_STATUS: 
      return {
        ...state, 
        navigation: {
          ...state.navigation,
          status:action.status
        }
      };

    case typesApp.UPDATE_APP_MODE: 
      return {
        ...state, 
        mode:action.mode
      };

    default: 
      return state;
  }
}
