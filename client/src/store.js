/** store **/

import create from 'zustand';

const useStore = create((set, get) => {
  return {
    navigation: {
      pages: {
        home: {
          active: true,
          link: '/home',
          title: 'Home',
          icon: 'faHome',
        },
        portfolio: {
          active: false,
          link: '/portfolio',
          title: 'Portfolio',
          icon: 'faImages',
        },
        contact: {
          active: false,
          link: '/contact',
          title: 'Contact',
          icon: 'faEnvelope',
        },
      },
      toggle: (page) =>
        set((state) => ({
          navigation: {
            ...state.navigation,
            pages: Object.keys(state.navigation.pages).reduce((accumulator, key) => ({ ...accumulator, [key]: { ...accumulator[key], active: key === page } }), state.navigation.pages),
          },
        })),
    },
    carousel: {
      midIndex: 3,
      setMidIndex: (midIndex) => set((state) => ({ carousel: { ...state.carousel, midIndex: midIndex } })),
      shift: (direction) => {
        switch (direction) {
          case 'prev':
            set((state) => ({
              carousel: {
                ...state.carousel,
                items: [...state.carousel.items.slice(-1), ...state.carousel.items.slice(0, state.carousel.items.length - 1)].map((item, index) => ({
                  ...item,
                  active: index === state.carousel.midIndex,
                })),
              },
            }));
            break;

          case 'next':
            set((state) => ({
              carousel: {
                ...state.carousel,
                items: [...state.carousel.items.slice(1, state.carousel.items.length), state.carousel.items[0]].map((item, index) => ({
                  ...item,
                  active: index === state.carousel.midIndex,
                })),
              },
            }));
            break;
        }
      },
      item: {
        update: (updatedItem) => {
          const itemIndex = get().carousel.items.findIndex((item) => item.name === updatedItem.name);
          set((state) => ({
            carousel: {
              ...state.carousel,
              items: [...state.carousel.items.slice(0, itemIndex), updatedItem, ...state.carousel.items.slice(itemIndex + 1)],
            },
          }));
        },
      },
      items: [
        {
          name: 'indaba',
          duration: { from: '2012', to: '2015' },
          active: true,
          images: {
            xs: [{ status: 'no-image', src: 'images/portfolio/indaba/xs.mts-cic-mobile-screens.png' }],
            lg: [
              {
                src: 'images/portfolio/indaba/lg.mc-2.1-mobile-screens-group-edit-ui-lightness.png',
                description: 'v1 real-time content API emulator and editor panels.',
                status: 'no-image',
              },
              {
                src: 'images/portfolio/indaba/lg.mc-2.1-mobile-screens-group-edit-ui-lightness-errors.png',
                description: 'v1 content navigation and editor error handling panels.',
                status: 'no-image',
              },
              {
                src: 'images/portfolio/indaba/lg.mc-2.1-mobile-screens-group-edit-ui-lightness-success.png',
                description: 'v1 content navigation and editor submit success panels.',
                status: 'no-image',
              },
              {
                src: 'images/portfolio/indaba/lg.mc-2.1-mobile-screens-group-edit-emulator-ui-lightness-success.png',
                description: 'v1 real-time content API emulator and editor submit success panels.',
                status: 'no-image',
              },
              {
                src: 'images/portfolio/indaba/lg.mc-2.1-mobile-screens-root-ui-darkness.png',
                description: 'v1 content navigation and editor panels',
                status: 'no-image',
              },
              {
                src: 'images/portfolio/indaba/lg.mc-2.1-mobile-screens-group-demographics-edit-vader.png',
                description: 'v1 content navigation and editor panels',
                status: 'no-image',
              },
              {
                src: 'images/portfolio/indaba/lg.mc-2.1-mobile-screens-group-emulator-vader.png',
                description: 'v1 real-time content API emulator and editor panels',
                status: 'no-image',
              },
              {
                src: 'images/portfolio/indaba/lg.mts-cic-mobile-screens.png',
                description: 'v2 content navigation, real-time API emulator and editor responsive panels.',
                status: 'no-image',
              },
              {
                src: 'images/portfolio/indaba/lg.mts-cic-access-control.png',
                description: 'v2 user administration.',
                status: 'no-image',
              },
            ],
          },
          header: 'Indaba Mobile',
          brief: 'Java/PHP fullstack, multimedia chat platform. Responsible for content management, surveys and reporting tools.',
          technologies: ['jquery-ui', 'spring', 'mysql', 'cassandra'],
        },
        {
          name: 'invent',
          duration: { from: '2015', to: '2017' },
          active: false,
          images: {
            xs: [{ status: 'no-image', src: 'images/portfolio/invent/xs.clicks.repeat-prescription.png' }],
            lg: [
              {
                src: 'images/portfolio/invent/lg.clicks.repeat-prescription.png',
                description: 'Java fullstack B2B eCommerce on Hybris (spring) of schema, models, services and frontend clients.',
                status: 'no-image',
              },
            ],
          },
          header: 'Invent Commerce',
          brief: 'Java fullstack B2B eCommerce on Hybris (spring) of schema, models, services and frontend clients.',
          technologies: ['jquery', 'hybris', 'spring', 'mysql'],
        },
        {
          name: 'pepkor',
          duration: { from: '2019', to: '2020' },
          active: false,
          images: {
            xs: [{ status: 'no-image', src: 'images/portfolio/pepkor/xs.pepkor-it.png' }],
            lg: [
              {
                src: 'images/portfolio/pepkor/lg.pepkor-it.png',
                description: 'Java (spring-boot, microservices) backend integration of POS and ERP systems.',
                status: 'no-image',
              },
            ],
          },
          header: 'PEPKOR',
          brief: 'Java (spring-boot, microservices) backend integration of POS and ERP systems.',
          technologies: ['java', 'spring', 'mysql'],
        },
        {
          name: 'personal',
          duration: { from: '2001', to: '2021' },
          active: false,
          images: {
            xs: [{ status: 'no-image', src: 'images/portfolio/personal/xs.engine-1.png' }],
            lg: [
              { status: 'no-image', src: 'images/portfolio/personal/lg.engine-1.png' },
              { status: 'no-image', src: 'images/portfolio/personal/lg.engine-2.png' },
              { status: 'no-image', src: 'images/portfolio/personal/lg.engine-3.png' },
              { status: 'no-image', src: 'images/portfolio/personal/lg.engine-4.png' },
              { status: 'no-image', src: 'images/portfolio/personal/lg.engine-5.png' },
              { status: 'no-image', src: 'images/portfolio/personal/lg.engine-6.png' },
              { status: 'no-image', src: 'images/portfolio/personal/lg.engine-7.png' },
            ],
          },
          header: 'Personal',
          brief: 'Personal projects.',
          technologies: ['react', 'typescript', 'webgl', 'three', 'zustand', 'bootstrap', 'sass'],
        },
        {
          name: 'ucook',
          duration: { from: '2018', to: '2019' },
          active: false,
          images: {
            xs: [{ status: 'no-image', src: 'images/portfolio/ucook/xs.meal-kits.png' }],
            lg: [
              {
                src: 'images/portfolio/ucook/lg.meal-kits.png',
                description: '',
                status: 'no-image',
              },
              {
                src: 'images/portfolio/ucook/lg.meal-kit-subscriptions.png',
                description: '',
                status: 'no-image',
              },
              {
                src: 'images/portfolio/ucook/lg.delivery-locations.png',
                description: '',
                status: 'no-image',
              },
            ],
          },
          header: 'uCook',
          brief: 'Node fullstack of B2C eCommerce on custom platform.',
          technologies: ['postgres', 'graphql', 'react', 'typescript'],
        },
        {
          name: 'cognician',
          duration: { from: '2017', to: '2018' },
          active: false,
          images: {
            xs: [{ status: 'no-image', src: 'images/portfolio/cognician/xs.cognician.png' }],
            lg: [
              {
                src: 'images/portfolio/cognician/lg.cognician.png',
                description: 'Clojure fullstack of client bespoke control panels.',
                status: 'no-image',
              },
            ],
          },
          header: 'Cognician',
          brief: 'Clojure fullstack of client bespoke control panels.',
          technologies: ['cljs', 'reagent'],
        },
        {
          name: 'glanbia',
          duration: { from: '2017', to: '2017' },
          active: false,
          images: {
            xs: [{ status: 'no-image', src: 'images/portfolio/glanbia/xs.glanbia.png' }],
            lg: [
              {
                status: 'no-image',
                description: 'Java backend of B2B eCommerce on Hybris (spring) of address and payment models.',
                src: 'images/portfolio/glanbia/lg.glanbia.png',
              },
            ],
          },
          header: 'Glanbia',
          brief: 'Java backend of B2B eCommerce on Hybris (spring) of address and payment models.',
          technologies: ['spring', 'hybris', 'postgres'],
        },
      ],
    },
    log: {
      messages: [{ date: new Date(), id: 'appInitial', status: 'success', text: 'Welcome.' }],
      max: 512,
      add: (message) => {
        set((state) => ({
          log: {
            ...state.log,
            messages: [...(state.log.messages.length >= state.log.max ? state.log.messages.slice(state.log.max * -1) : state.log.messages), message],
          },
        }));
      },
      delete: (message) => {
        set((state) => ({
          log: {
            ...state.log,
            messages: [...state.log.messages.filter((item) => item !== message)],
          },
        }));
      },
    },
  };
});

export default useStore;
