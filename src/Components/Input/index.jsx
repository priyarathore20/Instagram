import React from 'react'
import "./styles.css"

const Input = (props) => {
  return (
    <form>
      <label>{props.label}</label>
      <input className='input' type={props.type} placeholder={props.placeholder}  />
    </form>
  )
}

export default Input