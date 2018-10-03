/** reducers/carousel **/

import {types as typesCarousel} from 'types/carousel';

const initialState = { 
  status:'',
  index:2,
  active:2,
  direction:'',
  items:[
    {
      status:'no-image',
      index:0,
      reference:'glanbia',
      images: { 
        xs:'images/portfolio/glanbia/xs.glanbia.png',
        sm:'images/portfolio/indaba/remote-bravia.png',
        md:'images/portfolio/indaba/remote-bravia.png',
        lg:'images/portfolio/indaba/remote-bravia.png',
        xl:'images/portfolio/indaba/remote-bravia.png'
      },
      header:'Glanbia',
      brief:'B2B eCommerce for Nutritional Supplements based off of Hybris api. Work encompassed updating ux/ui for updating address and payment details.',
      technologies:[]
    },
    {
      status:'no-image',
      index:1,
      reference:'cognician',
      images: { 
        xs:'images/portfolio/cognician/xs.cognician.png',
        sm:'images/portfolio/indaba/remote-bravia.png',
        md:'images/portfolio/indaba/remote-bravia.png',
        lg:'images/portfolio/indaba/remote-bravia.png',
        xl:'images/portfolio/indaba/remote-bravia.png'
      },
      header:'Cognician',
      brief:'White labelled, business oriented coaching. Mine was the development of client bespoke features and changes.',
      technologies:[]
    },
    {
      status:'no-image',
      index:2,
      reference:'invent',
      images: { 
        xs:'images/portfolio/invent/xs.clicks.repeat-prescription.png',
        sm:'images/portfolio/indaba/remote-bravia.png',
        md:'images/portfolio/indaba/remote-bravia.png',
        lg:'images/portfolio/indaba/remote-bravia.png',
        xl:'images/portfolio/indaba/remote-bravia.png'
      },
      header:'Invent Commerce',
      brief:'Specialized eCommerce workshop specific to Hybris and Magento. The primary projects being Click\'s pharmacy features.',
      technologies:[]
    },
    {
      status:'no-image',
      index:3,
      reference:'indaba',
      images: { 
        xs:'images/portfolio/indaba/xs.mts-cic-mobile-screens.png',
        sm:'images/portfolio/indaba/remote-bravia.png',
        md:'images/portfolio/indaba/remote-bravia.png',
        lg:'images/portfolio/indaba/remote-bravia.png',
        xl:'images/portfolio/indaba/remote-bravia.png'
      },
      header:'Indaba Mobile',
      brief:'White labelled, native mobile, multi tenancy chat application with custom survey content and reporting.',
      technologies:[]
    },
    {
      status:'no-image',
      index:4,
      reference:'personal',
      images: { 
        xs:'images/portfolio/personal/xs.bravia-remote.png',
        sm:'images/portfolio/indaba/remote-bravia.png',
        md:'images/portfolio/indaba/remote-bravia.png',
        lg:'images/portfolio/indaba/remote-bravia.png',
        xl:'images/portfolio/indaba/remote-bravia.png'
      },
      header:'Personal',
      brief:'Some personal projects I\'ve maintained.',
      technologies:[]
    }
  ] 
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case typesCarousel.MOVE_CAROUSEL: 
      return {
        ...state,
        index:action.index,
        direction:action.direction,
        items: (() => {
          switch(action.direction) {

            case('next'): // first item to last
              return [...state.items.slice(1, state.items.length), state.items[0]]

            case('prev'): // last item to first 
              return [state.items[state.items.length -1], ...state.items.slice(0, state.items.length -1)]

            default: 
              return (() => {
                  const index = state.items.findIndex(item => item.index === action.index);
                  const offset = (state.items.length - 1) / 2 - index;

                  if(offset > 0) { // forwards 
                    const fwd = [...Array(offset).keys()].reduce(
                      (items, key) => { 
                        return [items[items.length -1], ...items.slice(0, items.length -1)];
                      }, 
                      state.items
                    );
                    return fwd;
                  }

                  else if (offset < 0) { // backwards
                    const rev = [...Array(-offset).keys()].reduce(
                      (items, key) => {
                        return [...items.slice(1, items.length), items[0]];
                      }, 
                      state.items
                    );
                    return rev;
                  }

                  else {
                    return [...state.items];
                  }
              })()
          }
        })()
      };

      case typesCarousel.CAROUSEL_IMAGE_REQUEST:
        return {
          ...state,
          status:action.status
        }

      case typesCarousel.CAROUSEL_IMAGE_SUCCESS:
        return {
          ...state,
          status:action.status
        }

      case typesCarousel.CAROUSEL_IMAGE_ERROR:
        return {
          ...state,
          status:action.status
        }

      case typesCarousel.UPDATE_ITEM_STATUS: {
        const index = state.items.findIndex(item => item.index === action.item.index);
        return {
          ...state,
          items:
            (index === 0) ? 
            [{...state.items[index], status:action.status}, ...state.items.slice(1, state.items.length)] : 
            (index === (state.items.length - 1)) ?
            [...state.items.slice(0, index), {...state.items[index], status:action.status}] :
            [...state.items.slice(0, index), {...state.items[index], status:action.status}, ...state.items.slice(index + 1, state.items.length)]
        }
      }

      default: 
        return state;
  }
}
