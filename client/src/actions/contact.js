/** actions/contact **/

import { types as typesContact } from '@types/contact';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import faArchive from '@fortawesome/fontawesome-free-solid/faArchive';
import faExclamation from '@fortawesome/fontawesome-free-solid/faExclamation';

library.add(faSpinner, faArchive, faExclamation);

export const contactEmailRequestHandler = () => {
  return (dispatch) => {
    dispatch({
      type: typesContact.CONTACT_EMAIL_REQUEST,
      status: 'loading',
    });
  };
};

export const contactEmailSuccessHandler = () => {
  return (dispatch) => {
    dispatch({
      type: typesContact.CONTACT_EMAIL_SUCCESS,
      status: null,
    });
  };
};

export const contactEmailErrorHandler = (error) => {
  return (dispatch) => {
    dispatch({
      type: typesContact.CONTACT_EMAIL_ERROR,
      status: 'error',
    });
  };
};

export const submitContactEmail = () => {
  return (dispatch) => {
    dispatch(contactEmailRequestHandler());
    return fetch(source, { method: 'get' })
      .then((response) => {
        if (!response.ok) {
          throw Error('Failed sending email.');
        } else {
          console.log('response: ', response);
        }
      })
      .catch((error) => dispatch(contactEmailErrorHandler(error)));
  };
};
