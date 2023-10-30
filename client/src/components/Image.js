import React, { useRef, useEffect, useState, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';

export default ({ src, cached = false, style = {}, ...props }) => {
  const statusMap = {
    'no-image': { status: 'warning', icon: faSpinner, spin: false },
    loading: { status: 'warning', icon: faSpinner, spin: true },
    'has-image': { status: 'success', icon: faCheck, spin: false },
    error: { status: 'error', icon: faExclamation, spin: false },
  };
  const domRef = useRef();
  const [status, setStatus] = useState('no-image');

  const fetchItemImage = async (dom, src) => {
    try {
      if (src) {
        setStatus('loading');
        const response = await fetch(src, { method: 'GET', cache: 'no-cache' });
        if (!response.ok || !/^image\/[a-zA-Z]{3,}/.test(response.headers.get('content-type'))) {
          throw new Error(`HTTP error retrieving ${src}, code: ${response.status}.`);
        }
        else {
          const blob = await response.blob();
          dom.setAttribute('src', URL.createObjectURL(blob));
          setStatus('has-image');
        }
      }
      else {
        throw new Error(`Invalid source "${src}".`);
      }
    } 
    catch (error) {
      setStatus('error');
      console.error(error);
    }
  };

  useEffect(() => {
    // const imageLoadHandler = (event) => (URL.revokeObjectURL(domRef.current.src), setStatus('has-image'));
    const imageErrorHandler = (event) => (URL.revokeObjectURL(domRef.current.src), setStatus('error'));
    // domRef.current.addEventListener('load', imageLoadHandler);
    domRef.current.addEventListener('error', imageErrorHandler);
    cached ? domRef.current.setAttribute('src', src) : fetchItemImage(domRef.current, src);
    return () => {
      // domRef.current.removeEventListener('load', imageLoadHandler);
      domRef.current.removeEventListener('error', imageErrorHandler);
    };
  }, []);

  return (
    <>
      {console.log(props.style)}
      <img 
        ref={domRef} 
        style={{...style, display: status === 'has-image' ? 'inline' : 'none'}} 
      />
      <FontAwesomeIcon 
        className={`${statusMap[status].status} mt-4`} 
        style={{...style, display: status !== 'has-image' ? 'inline' : 'none', height: '80px'}} 
        icon={statusMap[status].icon}
        spin={statusMap[status].spin}
        size="2x" 
      />
    </>
  );
};
