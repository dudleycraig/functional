/** reducers/carousel **/

import { types as typesCarousel } from 'types/carousel';

const initialState = {
  status: '', // whether the carousel is in transition or still
  index: 2, // index of center image, if there were 7 images, the center one would be of index 3
  active: 2, // currently displayed item
  direction: '', // left (previous), or right (next)
  x: 0,
  y: 0,
  items: [
    {
      status: 'no-image',
      index: 0,
      reference: 'glanbia',
      images: {
        xs: 'images/portfolio/glanbia/xs.glanbia.png',
        lg: 'images/portfolio/glanbia/lg.glanbia.png',
      },
      header: 'Glanbia',
      brief:
        'B2B eCommerce for Nutritional Supplements based off of Hybris api. Work encompassed updating ux/ui for updating address and payment details.',
      technologies: ['react', 'redux', 'bootstrap', 'sass', 'spring', 'hybris', 'jquery'],
    },
    {
      status: 'no-image',
      index: 1,
      reference: 'cognician',
      images: {
        xs: 'images/portfolio/cognician/xs.cognician.png',
        lg: 'images/portfolio/cognician/lg.cognician.png',
      },
      header: 'Cognician',
      brief: 'White labelled, business oriented coaching. Mine was the development of client bespoke features and changes.',
      technologies: ['cljs', 'reagent', 'bootstrap', 'sass'],
    },
    {
      status: 'no-image',
      index: 2,
      reference: 'invent',
      images: {
        xs: 'images/portfolio/invent/xs.clicks.repeat-prescription.png',
        lg: 'images/portfolio/invent/lg.clicks.repeat-prescription.png',
      },
      header: 'Invent Commerce',
      brief: 'Specialized eCommerce workshop specific to Hybris and Magento. The primary projects being Click\'s pharmacy features.',
      technologies: ['jquery', 'react', 'redux', 'hybris', 'magento', 'spring', 'mysql'],
    },
    {
      status: 'no-image',
      index: 3,
      reference: 'indaba',
      images: {
        xs: 'images/portfolio/indaba/xs.mts-cic-mobile-screens.png',
        lg: 'images/portfolio/indaba/lg.mts-cic-mobile-screens.png',
      },
      header: 'Indaba Mobile',
      brief: 'White labelled, native mobile, multi tenancy chat application with custom survey content and reporting.',
      technologies: ['jquery-ui', 'jquery', 'backbone', 'bootstrap', 'zend2', 'spring', 'mysql', 'cassandra'],
    },
    {
      status: 'no-image',
      index: 4,
      reference: 'personal',
      images: {
        xs: 'images/portfolio/personal/xs.bravia-remote.png',
        lg: 'images/portfolio/personal/lg.bravia-remote.png',
      },
      header: 'Personal',
      brief: "Some personal projects I've maintained.",
      technologies: ['react', 'redux', 'jquery-ui', 'jquery', 'bootstrap', 'sass', 'bash', 'zend2', 'node', 'postgres'],
    },
  ],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case typesCarousel.SORT_CAROUSEL:
      return {
        ...state,
        items: (() => {
          switch (state.direction) {
            case 'next': // first item to last
              return [...state.items.slice(1, state.items.length), state.items[0]];

            case 'prev': // last item to first
              return [state.items[state.items.length - 1], ...state.items.slice(0, state.items.length - 1)];

            default:
              return (() => {
                const index = state.items.findIndex((item) => item.index === state.index);
                const offset = (state.items.length - 1) / 2 - index;

                if (offset > 0) {
                  // forwards, TODO: amend with ...rest
                  const fwd = [...Array(offset).keys()].reduce((items, key) => {
                    return [items[items.length - 1], ...items.slice(0, items.length - 1)];
                  }, state.items);
                  return fwd;
                } else if (offset < 0) {
                  // backwards, TODO: amend with ...rest
                  const rev = [...Array(-offset).keys()].reduce((items, key) => {
                    return [...items.slice(1, items.length), items[0]];
                  }, state.items);
                  return rev;
                } else {
                  return [...state.items];
                }
              })();
          }
        })(),
      };

    case typesCarousel.CAROUSEL_IMAGE_REQUEST:
      return {
        ...state,
        status: action.status,
      };

    case typesCarousel.CAROUSEL_IMAGE_SUCCESS:
      return {
        ...state,
        status: action.status,
      };

    case typesCarousel.CAROUSEL_IMAGE_ERROR:
      return {
        ...state,
        status: action.status,
      };

    case typesCarousel.UPDATE_ITEM_STATUS: {
      const index = state.items.findIndex((item) => item.index === action.item.index);
      return {
        ...state,
        items:
          index === 0
            ? [{ ...state.items[index], status: action.status }, ...state.items.slice(1, state.items.length)]
            : index === state.items.length - 1
              ? [...state.items.slice(0, index), { ...state.items[index], status: action.status }]
              : [
                  ...state.items.slice(0, index),
                  { ...state.items[index], status: action.status },
                  ...state.items.slice(index + 1, state.items.length),
                ],
      };
    }

    case typesCarousel.UPDATE_DIRECTION:
      return {
        ...state,
        direction: action.direction,
        index: action.index,
      };

    case typesCarousel.UPDATE_DRAG_TRANSITION:
      return {
        ...state,
        x: action.x,
        y: action.y,
      };

    default:
      return state;
  }
};
