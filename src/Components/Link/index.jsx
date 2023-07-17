import React from 'react';

const Link = (props) => {
  return (
    <div>
      <a href={props.href}>{props.name}</a>
    </div>
  );
};

export default Link;
