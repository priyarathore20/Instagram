import React from 'react';
import './styles.css';

const Input = ({ type, placeholder, ...rest }) => {
  return (
    <div>
      <input
        className="input"
        {...rest}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
