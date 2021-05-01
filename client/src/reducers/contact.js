/** reducers/contact **/

import { types as typesContact } from '@types/contact';

const initialState = {
  status: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case typesCarousel.CONTACT_EMAIL_REQUEST:
      return {
        ...state,
        status: action.status,
      };

    case typesCarousel.CONTACT_EMAIL_SUCCESS:
      return {
        ...state,
        status: action.status,
      };

    case typesCarousel.CONTACT_EMAIL_ERROR:
      return {
        ...state,
        status: action.status,
      };

    default:
      return state;
  }
};
