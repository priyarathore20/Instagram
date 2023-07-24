import React from 'react'
import "./styles.css"

const Input = ({type, placeholder, ...rest}) => {
  return (
    <form>
      <input className='input' type={type} placeholder={placeholder}  />
    </form>
  )
}

export default Input