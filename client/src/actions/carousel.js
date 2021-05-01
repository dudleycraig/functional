/** actions/carousel **/

import { types as typesCarousel } from 'types/carousel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import faArchive from '@fortawesome/fontawesome-free-solid/faArchive';
import faExclamation from '@fortawesome/fontawesome-free-solid/faExclamation';

library.add(faSpinner, faArchive, faExclamation);

export const sortCarousel = () => {
  return (dispatch) => {
    dispatch({
      type: typesCarousel.SORT_CAROUSEL,
    });
  };
};

export const updateItemStatus = (item, status) => {
  return (dispatch) => {
    dispatch({
      type: typesCarousel.UPDATE_ITEM_STATUS,
      item: item,
      status: status,
    });
  };
};

export const updateDirection = (direction, index) => {
  return (dispatch) => {
    dispatch({
      type: typesCarousel.UPDATE_DIRECTION,
      direction: direction,
      index: index,
    });
  };
};

export const updateDragTransition = (x, y) => {
  return (dispatch) => {
    dispatch({
      type: typesCarousel.UPDATE_DRAG_TRANSITION,
      x: x,
      y: y,
    });
  };
};

export const carouselImageRequestHandler = (item) => {
  return (dispatch) => {
    dispatch(updateItemStatus(item, 'loading'));
    dispatch({
      type: typesCarousel.CAROUSEL_IMAGE_REQUEST,
      status: 'loading',
    });
  };
};

export const carouselImageSuccessHandler = (base64Image, target, item) => {
  target.setAttribute('src', base64Image);
  return (dispatch) => {
    dispatch(updateItemStatus(item, 'has-image'));
    dispatch({
      type: typesCarousel.CAROUSEL_IMAGE_SUCCESS,
      status: '',
    });
  };
};

export const carouselImageErrorHandler = (error, target, item) => {
  return (dispatch) => {
    dispatch(updateItemStatus(item, 'error'));
    dispatch({
      type: typesCarousel.CAROUSEL_IMAGE_ERROR,
      status: 'error',
    });
  };
};

export const fetchCarouselImage = (source, target, item) => {
  return (dispatch) => {
    dispatch(carouselImageRequestHandler(item));
    return fetch(source, { method: 'get' })
      .then((response) => {
        if (!response.ok) {
          throw Error('Failed fetching image.');
        } else {
          response
            .arrayBuffer()
            .then((buffer) => {
              const base64Image =
                'data:image/jpeg;base64,' +
                window.btoa(
                  [].slice.call(new Uint8Array(buffer)).reduce((binary, b) => (binary += String.fromCharCode(b)), '')
                );
              return base64Image;
            })
            .then((base64Image) => dispatch(carouselImageSuccessHandler(base64Image, target, item)))
            .catch((error) => dispatch(carouselImageErrorHandler(error, target, item)));
        }
      })
      .catch((error) => dispatch(carouselImageErrorHandler(error, target, item)));
  };
};
