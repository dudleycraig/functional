import React from 'react';
import useStore from '../store';

export default ({ name }) => {
  const tech = useStore((state) => state.tech);
  if (!tech[name]) return name;
  return (
    <a href={tech[name].link} title={tech[name].title}>
      {tech[name].text}
    </a>
  );
};
