/** reducers/app **/

import {types as typesApp} from 'types/app';

const initialState = { 
  messages:{
    max:1,
    counter:0,
    hash:{}
  }
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    default: 
      return state;
  }
}
