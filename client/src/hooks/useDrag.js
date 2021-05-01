import React, { useEffect, useReducer } from 'react';

export default (domRef) => {
  const [state, dispatch] = useReducer(
    (state, event) => {
      switch (event.type) {
        case 'touchstart':
        case 'mousedown':
          event.preventDefault();
          event.stopPropagation();
          return !state.dragging
            ? {
                dragging: true,
                start: { x: event.pageX, y: event.pageY },
                prev: {},
                current: {},
                end: {},
              }
            : state;
        case 'touchmove':
        case 'mousemove':
          event.stopPropagation();
          return state.dragging
            ? {
                dragging: true,
                start: { ...state.start },
                prev: { ...state.current },
                current: { x: event.pageX, y: event.pageY },
                end: { ...state.end },
              }
            : state;
        case 'touchend':
        case 'touchcancel':
        case 'mouseup':
        case 'mouseleave':
          event.stopPropagation();
          return state.dragging
            ? {
                dragging: false,
                start: { ...state.start },
                current: { ...state.current },
                end: { x: event.pageX, y: event.pageY },
              }
            : state;
        default:
          return state;
      }
    },
    { dragging: false, start: {}, prev: {}, current: {}, end: {} }
  );

  useEffect(() => {
    if (!domRef.current) return;

    if ('ontouchstart' in domRef.current) {
      domRef.current.addEventListener('touchstart', dispatch);
      domRef.current.addEventListener('touchmove', dispatch);
      domRef.current.addEventListener('touchend', dispatch);
      domRef.current.addEventListener('touchcancel', dispatch);
    } else {
      domRef.current.addEventListener('mousedown', dispatch);
      domRef.current.addEventListener('mousemove', dispatch);
      domRef.current.addEventListener('mouseup', dispatch);
      domRef.current.addEventListener('mouseleave', dispatch);
    }
    domRef.current.addEventListener('dragstart', () => false);

    return () => {
      if ('ontouchstart' in domRef.current) {
        domRef.current.removeEventListener('touchstart', dispatch);
        domRef.current.removeEventListener('touchmove', dispatch);
        domRef.current.removeEventListener('touchend', dispatch);
        domRef.current.removeEventListener('touchcancel', dispatch);
      } else {
        domRef.current.removeEventListener('mousedown', dispatch);
        domRef.current.removeEventListener('mousemove', dispatch);
        domRef.current.removeEventListener('mouseup', dispatch);
        domRef.current.removeEventListener('mouseleave', dispatch);
      }
      domRef.current.removeEventListener('dragstart', () => false);
    };
  }, [domRef]);

  return state;
};

/**
 * usage
 *
const drag = useDrag(domRef.current);
const ratio = 300;
const quadrants = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2, 2 * Math.PI];
const angleOfLine = (width, height) => {
  const signed = Math.atan2(height, width);
  return signed < 0 ? signed + 2 * Math.PI : signed;
};

useFrame(() => {
  if (engineRef.current && drag.prev && drag.prev.x) {
    const width = drag.current.x - drag.prev.x;
    const height = drag.current.y - drag.prev.y;
    const radians = angleOfLine(width, height);

    if (radians >= quadrants[0] && radians < quadrants[1]) {
      engineRef.current.rotation.x -= Math.abs(height) / ratio;
      engineRef.current.rotation.y += Math.abs(width) / ratio;
    }

    if (radians >= quadrants[1] && radians < quadrants[2]) {
      engineRef.current.rotation.x -= Math.abs(height) / ratio;
      engineRef.current.rotation.y -= Math.abs(width) / ratio;
    }

    if (radians >= quadrants[2] && radians < quadrants[3]) {
      engineRef.current.rotation.x += Math.abs(height) / ratio;
      engineRef.current.rotation.y -= Math.abs(width) / ratio;
    }

    if (radians >= quadrants[3] && radians < quadrants[4]) {
      engineRef.current.rotation.x += Math.abs(height) / ratio;
      engineRef.current.rotation.y += Math.abs(width) / ratio;
    }
  }
});
 *
 **/
