import React from 'react';
import useTime from '../hooks/useTime';

export default ({ date, ...props }) => {
  const now = useTime(+2);
  const hours = ('0' + now.getHours()).slice(-2);
  const minutes = ('0' + now.getMinutes()).slice(-2);
  const seconds = ('0' + now.getSeconds()).slice(-2);

  return (
    <span className="date-time" {...props}>
      <span className="time">{`${hours}:${minutes}:${seconds}`}</span>
    </span>
  );
};
