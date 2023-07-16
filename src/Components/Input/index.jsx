import React from 'react'

const Input = (props) => {
  return (
    <form>
      <label>{props.label}</label>
      <input type={props.type} placeholder={props.placeholder}  />
    </form>
  )
}

export default Input