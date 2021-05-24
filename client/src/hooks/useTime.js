import React, { useState, useEffect } from 'react';

export default (offset = 2) => {
  const date = new Date();
  const [now, setNow] = useState(new Date(date.getTime() + date.getTimezoneOffset() * 60000 + 3600000 * offset));

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setNow(new Date(date.getTime() + date.getTimezoneOffset() * 60000 + 3600000 * offset));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return now;
};
