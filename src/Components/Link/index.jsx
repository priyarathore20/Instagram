import React from 'react';
import "./styles.css"

const Link = (props) => {
  return (
    <div >
      <a className='link' href={props.href}>{props.name}</a>
    </div>
  );
};

export default Link;
