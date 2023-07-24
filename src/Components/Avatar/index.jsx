import React from 'react';
import "./styles.css"

const Avatar = (props) => {
  return (
    <div className="avatar">
      <img src={props.img}  />
      <p>{props.initial}</p>
    </div>
  );
};

export default Avatar;
