import React from 'react'
import "./styles.css"

const Input = ({label, type, placeholder, ...rest}) => {
  return (
    <form>
      <label>{label}</label>
      <input className='input' type={type} placeholder={placeholder}  />
    </form>
  )
}

export default Input